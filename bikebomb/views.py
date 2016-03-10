""" Views for main site """
import logging
import os
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.core.exceptions import PermissionDenied
from django.http import HttpResponseRedirect
from django.shortcuts import render

from bikestats.models import parse_all


SCRAPE_DIR = os.path.join(os.path.dirname(__file__), '../www.motorcyclespecs.co.za')


def index(request):
    """ Index/home page for site """
    return render(request, 'index.html', {})


@login_required
def update(request):
    """ Update scrape """
    parse_all(SCRAPE_DIR)
    return render(request, 'index.html', {})
