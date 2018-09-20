from rest_framework import generics, permissions

from . import serializers, models


class ListCreateRiskTypeView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAdminUser, )
    serializer_class = serializers.RiskTypeListSerializer
    queryset = models.RiskType.objects.all()
