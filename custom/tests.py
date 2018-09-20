from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token

from django.urls import reverse_lazy

from . import factories


class BaseApiTestCase(APITestCase):
    def setUp(self):
        self.user = factories.UserFactory()
        self.token, _ = Token.objects.get_or_create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token}")


class TestCreateRiskTypes(BaseApiTestCase):
    def setUp(self):
        super(TestCreateRiskTypes, self).setUp()
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
