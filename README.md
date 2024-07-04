# Store

![License](https://img.shields.io/badge/license-MIT-blue.svg)

A [Flarum](http://flarum.org) extension. 

This extension provides a store that can be used to purchase item with money of `antoinefr/flarum-ext-money`.

At the beginning, the extension is developed for another extension [user-decoration](https://github.com/zxy19/user-decoration). But it will probably be used for more extensions in the future.

About how to create a provider, see [xypp-store-template](https://github.com/zxy19/store-template)

## Installation

Install with composer:

```sh
composer require xypp/store:"*"
```

## Updating

```sh
composer update xypp/store:"*"
php flarum migrate
php flarum cache:clear
```

## Links

- [GitHub](https://github.com/zxy19/store)