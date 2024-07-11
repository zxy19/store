# Store

![License](https://img.shields.io/badge/license-MIT-blue.svg)

A [Flarum](http://flarum.org) extension. 

This extension provides a store that can be used to purchase item with money of `antoinefr/flarum-ext-money`.

This extension requires SCHEDULE. If not configured, the expire will never happens automatically.



## Development

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