from rest_framework.response import Response
from rest_framework import pagination


class PageNumberPagination(pagination.PageNumberPagination):
    def get_paginated_response(self, data):
        prev_page_num, next_page_num = False, False
        if self.page.has_previous():
            prev_page_num = self.page.previous_page_number()
        if self.page.has_next():
            next_page_num = self.page.next_page_number()
        return Response({
            'page': self.page.number,
            'previous': prev_page_num,
            'next': next_page_num,
            'count': self.page.paginator.count,
            'results': data,
        })
