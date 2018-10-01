from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED

from . import models

import uuid


class BaseRiskResultMixin(object):
    @staticmethod
    def get_risk_type(**kwargs):
        risk_type_pk = kwargs.get('risk_type_pk')
        try:
            return models.RiskType.objects.get(id=risk_type_pk)
        except models.RiskType.DoesNotExist:
            return Response({'error': 'Not Found'}, status=HTTP_404_NOT_FOUND)


class RiskResultListMixin(BaseRiskResultMixin):
    """
    List all risk types
    """
    LIMIT = 10

    def list(self, request, *args, **kwargs):
        key = request.GET.get('key', None)
        risk_type = self.get_risk_type(**kwargs)
        if isinstance(risk_type, Response):
            return risk_type
        table = risk_type.get_dynamodb_table()

        scan_params = {'Limit': self.LIMIT}
        if key:
            scan_params['ExclusiveStartKey'] = {'uuid': key}

        table_data = table.scan(**scan_params)

        data = {
            'results': table_data.get('Items'),
            'paginationKey': table_data.get(
                'LastEvaluatedKey', {}
            ).get('uuid', None),
        }
        return Response(data)


class RiskResultCreateMixin(BaseRiskResultMixin):
    """
    Create a model instance.
    """
    def create(self, request, *args, **kwargs):
        risk_type = self.get_risk_type(**kwargs)
        if isinstance(risk_type, Response):
            return risk_type
        table = risk_type.get_dynamodb_table()
        data = request.data.copy()
        data['uuid'] = str(uuid.uuid4())
        table.put_item(
            Item=data,
        )
        return Response(data, status=HTTP_201_CREATED)
