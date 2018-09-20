from django.urls import path

from . import views

app_name = 'Custom'

urlpatterns = [
    path('riskTypes/', views.ListCreateRiskTypeView.as_view(),
         name='list-create-risk-type'),
]
