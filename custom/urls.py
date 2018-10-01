from django.urls import path

from . import views

app_name = 'Custom'

urlpatterns = [
    path('riskTypes/', views.ListCreateRiskTypeView.as_view(),
         name='list-create-risk-type'),
    path('riskTypes/<int:pk>/',
         views.RetrieveUpdateDestroyRiskTypeView.as_view(),
         name='detail-risk-type'),
    path('riskTypes/<int:risk_type_pk>/results/',
         views.ListCreateRiskResultsView.as_view(),
         name='list-create-risk-results'),
]
