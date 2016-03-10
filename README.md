bikebomb
========

Compare and contrast mnotorcycle data

Usage
-----

Good ol' django. After installing python and virtualenv:

    virtualenv .
    source bin/activate
    pip install -r requirements.txt
    ./manage runserver

You must acquire bikestats data from the download script and import via the /update endpoint as well. It is
currently just over 3GB. Check http://github.com/narfman0/bikestats for instructions on how to get the data,
then symbolic link that data to your root directory.

Then got to localhost:8000 and win!

TODO
----

* Ingest stats for table
* Make gulp/webpack project for vendor js and own js currently in static folder
* Fix scrapers for more models
* Add regex filters for columns e.g. model "(1200S|FZ-09)" to react-bootstrap-table

License
-------

Copyright (c) 2016 Jon Robison

See included LICENSE for licensing information
