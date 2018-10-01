from rest_framework import generics, views

from . import serializers, models, permissions, mixins


class ListCreateRiskTypeView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAdminUserOrReadOnly, )
    serializer_class = serializers.RiskTypeSerializer
    queryset = models.RiskType.objects.all()


class RetrieveUpdateDestroyRiskTypeView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAdminUserOrReadOnly, )
    serializer_class = serializers.RiskTypeSerializer
    queryset = models.RiskType.objects.all()
    lookup_field = 'id'
    lookup_url_kwarg = 'pk'


class ListCreateRiskResultsView(mixins.RiskResultListMixin,
                                mixins.RiskResultCreateMixin,
                                generics.GenericAPIView):
    """
    Concrete view for listing risk type results or creating one
    """
    risk_type_model = models.RiskType

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
