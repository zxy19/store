# Store

![License](https://img.shields.io/badge/license-MIT-blue.svg)
[![Latest Stable Version](https://img.shields.io/packagist/v/xypp/store.svg)](https://packagist.org/packages/xypp/store)
[![Total Downloads](https://img.shields.io/packagist/dt/xypp/store.svg)](https://packagist.org/packages/xypp/store)

[简体中文使用者见此文档](README-zh.md)

A [Flarum](http://flarum.org) extension. 

This extension provides a store that can be used to purchase item with money of `antoinefr/flarum-ext-money`.

This extension requires [SCHEDULE](). If not configured, the expire will never happens automatically.

More details, see [Wiki](https://github.com/zxy19/store-template/wiki/zh)

## Development

This extension provides a simple way to create an item for user to select. It can also used to any case when need to create an item using with money.

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
- [Packagist](https://packagist.org/packages/xypp/store)