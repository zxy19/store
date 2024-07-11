<?php

namespace Xypp\Store;

use Flarum\Foundation\ContainerUtil;
use Flarum\User\User;
use Xypp\Store\Context\PurchaseContext;
use Xypp\Store\Context\UseContext;
use Xypp\Store\AbstractStoreProvider;

class WarpStoreProvider extends AbstractStoreProvider
{
    public $name;
    public $canSeeInHistory = false;
    public $canUse = true;
    public $canUseFrontend = true;
    public $singleHold = false;
    protected $onExpire;
    protected $onUse;
    protected $onPurchase;

    public function __construct(callable $purchase, callable|null $use = null, callable|null $onExpire = null)
    {
        $this->onPurchase = $purchase;
        $this->onUse = $use;
        if (!$use) {
            $this->canUse = false;
        }
        $this->onExpire = $onExpire;
    }

    public function extend($container)
    {
        $this->onPurchase = ContainerUtil::wrapCallback($this->onPurchase, $container);
        $this->onUse = ContainerUtil::wrapCallback($this->onUse, $container);
        $this->onExpire = ContainerUtil::wrapCallback($this->onExpire, $container);
    }

    public function expire(PurchaseHistory $item): bool
    {
        if ($this->onExpire) {
            return call_user_func($this->onExpire, $item);
        }
        return true;
    }

    /**
     * @inheritDoc
     */
    public function purchase(StoreItem $item, User $user, PurchaseHistory|null $old = null, PurchaseContext $context): array|bool|string
    {
        return call_user_func($this->onPurchase, $item, $user, $old, $context);
    }


    /**
     * @inheritDoc
     */
    public function useItem(PurchaseHistory $item, User $user, string $data, UseContext $context): bool
    {
        if ($this->onUse) {
            return call_user_func($this->onUse, $item, $user, $data, $context);
        }
        return false;
    }

    /**
     * @inheritDoc
     */
    public function canPurchase(StoreItem $item, User $user): bool|string
    {
        return true;
    }


    /**
     * @inheritDoc
     */
    public function serialize(StoreItem $item): array
    {
        return [];
    }


    /**
     * @inheritDoc
     */
    public function serializeHistory(PurchaseHistory $item): array
    {
        return [];
    }
}