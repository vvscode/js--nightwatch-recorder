Chrome Nightwatch.js Recorder ( based on Resurrectio )
===========

Original project is at https://github.com/ebrehault/resurrectio.git


Installation
============


From Github sources::

    git clone git@github.com:vvscode/js--nightwatch-recorder.git

It will produce a ./resurrectio folder.

Then, in Chrome:

    - go to **Tools / Extensions**,
    - expand **Developer mode**,
    - click **Load unpacked extension**,
    - select the ./js--nightwatch-recorder folder.

Usage
=====

Click on the Resurrectio extension icon.

Enter the start URL, and click Go.

Then execute your usage scenario, all the events will be recorded.

By right-clicking on the page, you might also record some assertion (about the
current url, about existing text, etc.).

You can request a **screenshot** at any moment (they will be produced everytime
you run the resulting test).

You might also record some comments (click again on the extension icon, and
click **Add comment**).

When you are done, click again on the extension icon, and
click **Stop recording**.

Now, generate the CasperJS test script by clicking **Export NightwatchJS**.

It will play your entire scenario and generate the screenshots.

Future features
===============

Implement more mouse events, like drag & drop and mousewheel.

Credits
=======

Author
------

* Eric BREHAULT <eric.brehault@makina-corpus.org>

* Resurrectio event recorder is based on the zope.recorder tool, created by Brian Lloyd <brian@zope.com>

* Adapted for NightwatchJs by vvscode <v.vanchuk@tut.by>

Companies
---------
|makinacom|_

* `Makina Corpus blog <http://makina-corpus.com/blog/metier/>`_
* `Contact us <mailto:python@makina-corpus.org>`_


.. |makinacom| image:: http://depot.makina-corpus.org/public/logo.gif
.. _makinacom:  http://www.makina-corpus.com


.. image:: https://d2weczhvl823v0.cloudfront.net/ebrehault/resurrectio/trend.png
   :alt: Bitdeli badge
   :target: https://bitdeli.com/free



.. image:: https://d2weczhvl823v0.cloudfront.net/vvs-code/nightwatch-recorder/trend.png
   :alt: Bitdeli badge
   :target: https://bitdeli.com/free

