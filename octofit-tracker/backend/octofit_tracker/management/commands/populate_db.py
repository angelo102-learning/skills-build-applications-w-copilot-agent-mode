from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

# Models for teams, activities, leaderboard, workouts
class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    members = models.JSONField(default=list)
    class Meta:
        app_label = 'octofit_tracker'

class Activity(models.Model):
    user_email = models.EmailField()
    type = models.CharField(max_length=100)
    duration = models.IntegerField()
    class Meta:
        app_label = 'octofit_tracker'

class Leaderboard(models.Model):
    team = models.CharField(max_length=100)
    points = models.IntegerField()
    class Meta:
        app_label = 'octofit_tracker'

class Workout(models.Model):
    name = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=50)
    class Meta:
        app_label = 'octofit_tracker'

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        # Delete all data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create users (superheroes)
        marvel = [
            {'email': 'ironman@marvel.com', 'username': 'IronMan'},
            {'email': 'captain@marvel.com', 'username': 'CaptainAmerica'},
            {'email': 'thor@marvel.com', 'username': 'Thor'}
        ]
        dc = [
            {'email': 'batman@dc.com', 'username': 'Batman'},
            {'email': 'superman@dc.com', 'username': 'Superman'},
            {'email': 'wonderwoman@dc.com', 'username': 'WonderWoman'}
        ]
        for user in marvel + dc:
            User.objects.create_user(email=user['email'], username=user['username'], password='test1234')

        # Create teams
        Team.objects.create(name='Marvel', members=[u['email'] for u in marvel])
        Team.objects.create(name='DC', members=[u['email'] for u in dc])

        # Create activities
        Activity.objects.create(user_email='ironman@marvel.com', type='Running', duration=30)
        Activity.objects.create(user_email='batman@dc.com', type='Cycling', duration=45)

        # Create leaderboard
        Leaderboard.objects.create(team='Marvel', points=100)
        Leaderboard.objects.create(team='DC', points=90)

        # Create workouts
        Workout.objects.create(name='Pushups', difficulty='Easy')
        Workout.objects.create(name='HIIT', difficulty='Hard')

        # Ensure unique index on email
        from pymongo import MongoClient
        client = MongoClient('mongodb://localhost:27017')
        db = client['octofit_db']
        db['users'].create_index('email', unique=True)
        self.stdout.write(self.style.SUCCESS('Database populated with test data.'))
