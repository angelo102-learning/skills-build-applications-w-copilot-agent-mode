"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

import os
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, TeamViewSet, ActivityViewSet, WorkoutViewSet, LeaderboardViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.urls import reverse

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'activities', ActivityViewSet)
router.register(r'workouts', WorkoutViewSet)
router.register(r'leaderboard', LeaderboardViewSet)

@api_view(['GET'])
def api_root(request, format=None):
    # Get the codespace name from environment variable
    codespace_name = os.getenv('CODESPACE_NAME', 'localhost')
    scheme = 'https' if codespace_name != 'localhost' else 'http'
    
    if codespace_name == 'localhost':
        base_url = f'{scheme}://{request.get_host()}/api'
    else:
        base_url = f'{scheme}://{codespace_name}-8000.app.github.dev/api'
    
    return Response({
        'users': f'{base_url}/users/',
        'teams': f'{base_url}/teams/',
        'activities': f'{base_url}/activities/',
        'workouts': f'{base_url}/workouts/',
        'leaderboard': f'{base_url}/leaderboard/',
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', api_root, name='api_root'),
]
