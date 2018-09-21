from rest_framework import generics

from . import serializers, models, permissions


class ListCreateRiskTypeView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAdminUserOrReadOnly, )
    serializer_class = serializers.RiskTypeListSerializer
    queryset = models.RiskType.objects.all()
