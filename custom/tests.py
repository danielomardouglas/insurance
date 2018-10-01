from unittest import TestCase
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token

from django.urls import reverse_lazy
from django.conf import settings

import boto3

from . import factories


class BaseApiTestCase(APITestCase):
    def setUp(self):
        self.user = factories.UserFactory()
        self.token, _ = Token.objects.get_or_create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token}")
        self.dynamodb = boto3.client(
            'dynamodb',
            endpoint_url=settings.DYNAMODB_ENDPOINT,
            region_name=settings.DYNAMODB_REGION,
        )

    def tearDown(self):
        for table in self.dynamodb.list_tables()['TableNames']:
            self.dynamodb.delete_table(TableName=table)
        super(BaseApiTestCase, self).tearDown()

    def remove_superuser_status(self):
        self.user.is_superuser = False
        self.user.is_staff = False
        self.user.save()


class TestModelStringRepresentations(TestCase):
    def setUp(self):
        self.risk_type = factories.RiskTypeFactory()
        self.risk_field = factories.RiskFieldFactory(risk_type=self.risk_type)

    def test_risk_type(self):
        self.assertEquals(str(self.risk_type), self.risk_type.name)

    def test_risk_field(self):
        self.assertEquals(str(self.risk_field),
                          f"{self.risk_field.name} {self.risk_field.type}")


class TestListCreateRiskTypes(BaseApiTestCase):
    def setUp(self):
        super(TestListCreateRiskTypes, self).setUp()
        self.url = reverse_lazy('Custom:list-create-risk-type')
        self.dynamodb = boto3.client(
            'dynamodb',
            endpoint_url=settings.DYNAMODB_ENDPOINT,
            region_name=settings.DYNAMODB_REGION,
        )

    def test_create_risk_type(self):
        data = {
            'name': 'Car Risk Type',
            'risk_fields': [
                {
                    'name': 'Owner First Name',
                    'type': 'text',
                },
                {
                    'name': 'Car Model',
                    'type': 'select',
                    'options': [
                        'Mercedes',
                        'BMW',
                        'Audi',
                    ],
                },
                {
                    'name': 'First Registration Date',
                    'type': 'date',
                },
                {
                    'name': 'Mileage',
                    'type': 'number',
                },
                {
                    'name': 'Price',
                    'type': 'currency',
                },
                {
                    'name': 'Gear',
                    'type': 'option',
                    'options': [
                        'Manual',
                        'Automatic',
                    ]
                },
                {
                    'name': 'Color',
                    'type': 'color',
                },
                {
                    'name': 'New',
                    'type': 'bool',
                }
            ]
        }
        response = self.client.post(self.url, data=data, format='json')
        self.assertEquals(response.status_code, 201)
        self.assertEquals(len(response.data['risk_fields']),
                          len(data['risk_fields']))

    def test_list_risk_types(self):
        risk_type = factories.RiskTypeFactory()
        response = self.client.get(self.url, format='json')
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.data['results'][0]['name'], risk_type.name)

    def test_non_superuser_create_risk_type(self):
        self.remove_superuser_status()
        data = {
            'name': 'Non User Risk Type'
        }
        response = self.client.post(self.url, data=data, format='json')
        self.assertEquals(response.status_code, 403)

    def test_post_create_dynamodb_table(self):
        data = {
            'name': 'DynamoDB Integration',
        }
        response = self.client.post(self.url, data=data, format='json')
        self.assertIn(
            response.data['table_name'],
            self.dynamodb.list_tables()['TableNames']
        )

    def test_get_dynamodb_table_and_check_schema(self):
        risk_type = factories.RiskTypeFactory()
        table = risk_type.get_dynamodb_table()
        self.assertListEqual(
            table.key_schema,
            [{'AttributeName': 'uuid', 'KeyType': 'HASH'}]
        )


class TestRetrieveUpdateDestroyRiskType(BaseApiTestCase):
    def setUp(self):
        super(TestRetrieveUpdateDestroyRiskType, self).setUp()
        self.risk_type = factories.RiskTypeFactory()
        self.risk_field = factories.RiskFieldFactory(risk_type=self.risk_type)
        self.url = reverse_lazy('Custom:detail-risk-type', kwargs={
            'pk': self.risk_type.pk,
        })

    def generate_update_data(self):
        return {
            'name': 'Truck Risk Type',
            'risk_fields': [
                {
                    # This one for update
                    'id': self.risk_field.id,
                    'options': [
                        'manual',
                        'automatic',
                        'semi-automatic',
                    ]
                },
                {
                    # This one for append to fields
                    'name': 'Color',
                    'type': 'color',
                },
            ]
        }

    def test_retrieve_risk_type(self):
        response = self.client.get(self.url, format='json')
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.data['name'], self.risk_type.name)
        self.assertEquals(response.data['risk_fields'][0]['name'],
                          self.risk_field.name)

    def test_update_risk_type(self):
        data = self.generate_update_data()
        response = self.client.patch(self.url, data=data, format='json')
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.data['name'], data['name'])
        self.assertEquals(len(response.data['risk_fields']),
                          len(data['risk_fields']))
        self.assertEquals(response.data['risk_fields'][0]['options'],
                          data['risk_fields'][0]['options'])

    def test_non_superuser_update_risk_type(self):
        self.remove_superuser_status()
        data = self.generate_update_data()
        response = self.client.patch(self.url, data=data, format='json')
        self.assertEquals(response.status_code, 403)

    def test_destroy_risk_type(self):
        response = self.client.delete(self.url, format='json')
        self.assertEquals(response.status_code, 204)

    def test_non_superuser_delete_risk_type(self):
        self.remove_superuser_status()
        response = self.client.delete(self.url, format='json')
        self.assertEquals(response.status_code, 403)


class TestCustomPagination(BaseApiTestCase):
    def setUp(self):
        super(TestCustomPagination, self).setUp()
        for i in range(21):
            factories.RiskTypeFactory()
        self.url = f"{reverse_lazy('Custom:list-create-risk-type')}?page=2"

    def test_pagination(self):
        response = self.client.get(self.url)
        self.assertEquals(response.data['previous'], 1)
        self.assertEquals(response.data['next'], 3)
