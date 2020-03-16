from rest_framework import routers
from .api import VideoViewSet

router = routers.DefaultRouter()
router.register('api/video',VideoViewSet,'backend')

urlpatterns = router.urls