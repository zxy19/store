# Store

![License](https://img.shields.io/badge/license-MIT-blue.svg)
[![Latest Stable Version](https://img.shields.io/packagist/v/xypp/store.svg)](https://packagist.org/packages/xypp/store)
[![Total Downloads](https://img.shields.io/packagist/dt/xypp/store.svg)](https://packagist.org/packages/xypp/store)

[For English user please refer to this document.](README.md)

A [Flarum](http://flarum.org) extension.

一个[Flarum](http://flarum.org) 扩展。

该拓展提供了一个商店，用户可以在其中使用 `antoinefr/flarum-ext-money` 中的货币来购买物品。

**此拓展要求使用 PHP8 或更高版本**

该拓展要求使用 [scheduler](https://docs.flarum.org/scheduler)。如果未配置，限时商品的过期将不会自动发生。

关于使用说明，详见 [Wiki](https://github.com/zxy19/store-template/wiki/zh-home)

## Development

该拓展提供了一种简单方式来创建用户可以选择的物品。它也可以用于任何需要使用货币来使用物品的情况。

关于如何创建提供者，请参阅 [xypp-store-template](https://github.com/zxy19/store-template)

## Installation

使用 composer:

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
