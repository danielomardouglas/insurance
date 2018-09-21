from unittest import TestCase
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token

from django.urls import reverse_lazy

from . import factories


class BaseApiTestCase(APITestCase):
    def setUp(self):
        self.user = factories.UserFactory()
        self.token, _ = Token.objects.get_or_create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token}")


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
                    'type': 'enum',
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
        self.user.is_superuser = False
        self.user.is_staff = False
        self.user.save()
        data = {
            'name': 'Non User Risk Type'
        }
        response = self.client.post(self.url, data=data, format='json')
        self.assertEquals(response.status_code, 403)


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
