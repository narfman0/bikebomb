from django.conf.urls import include, url
from django.contrib import admin

import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include('bikebomb.api.urls')),
    url(r'^update/', views.update),
]
