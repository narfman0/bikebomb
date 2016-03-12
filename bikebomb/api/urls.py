from django.conf.urls import include, url
from django.contrib import admin
from rest_framework import routers, pagination, permissions, serializers, viewsets
from bikestats.models import Make, Model, Stat


class ModelSerializer(serializers.ModelSerializer):
    make = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Model
        fields = ('id', 'name', 'make', 'year_start', 'year_end', 'description')


class ModelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Model.objects.all()
    serializer_class = ModelSerializer


class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stat
        fields = '__all__'


class StatViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Stat.objects.all()
    serializer_class = StatSerializer


admin.autodiscover()
router = routers.DefaultRouter()
router.register(r'models', ModelViewSet)
router.register(r'stats', StatViewSet)
urlpatterns = [
    url(r'^', include(router.urls)),
]
