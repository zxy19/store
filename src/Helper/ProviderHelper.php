<?php

namespace Xypp\Store\Helper;

use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use Flarum\User\User;
use Xypp\Store\AbstractStoreProvider;
use Xypp\Store\Context\PurchaseContext;
use Xypp\Store\Context\UseContext;
use Xypp\Store\PurchaseHistory;
use Xypp\Store\StoreItem;

/**
 * Functions to interact with Providers.
 * Also some functions to help with translate.
 */
class ProviderHelper
{
    /**
     * Registered providers
     */
    private static array $extendProvider = [];
    /**
     * Register a provider.
     * @param AbstractStoreProvider $provider
     */
    public static function addProvider(AbstractStoreProvider $provider): void
    {
        self::$extendProvider[$provider->name] = $provider;
    }

    protected $translator;
    public function __construct(Translator $translator)
    {
        $this->translator = $translator;
    }

    /**
     * Get provider by name.
     * @param string $name
     * @throws \Flarum\Foundation\ValidationException
     * @return \Xypp\Store\AbstractStoreProvider
     */
    public function getProvider(string $name): AbstractStoreProvider
    {
        if (!isset(self::$extendProvider[$name])) {
            throw new ValidationException(["provider" => $this->translator->trans("xypp-store.forum.provider.error.title")]);
        }
        return self::$extendProvider[$name];
    }
    /**
     * Check if provider exists
     * @param string $name
     * @return bool
     */
    public function hasProvider(string $name): bool
    {
        if (!$name)
            return false;
        return isset(self::$extendProvider[$name]);
    }
    /**
     * Get serialized data when purchasing
     * @param \Xypp\Store\StoreItem $item
     * @return array
     */
    public function getAttrData(StoreItem $item): array
    {
        if (!$this->hasProvider($item->provider))
            return ['_unavailable' => true];
        return $this->getProvider($item->provider)->serialize($item);
    }
    /**
     * Get serialized data when using
     * @param \Xypp\Store\PurchaseHistory $item
     * @return array
     */
    public function getAttrHistory(PurchaseHistory $item): array
    {
        if (!$this->hasProvider($item->provider))
            return ['_unavailable' => true];
        return $this->getProvider($item->provider)->serializeHistory($item);
    }

    /**
     * Actions when purchasing item
     * @param mixed $actor
     * @param \Xypp\Store\StoreItem $item
     * @param \Xypp\Store\PurchaseHistory|null $old
     * @param \Xypp\Store\Context\PurchaseContext $context
     * @return string
     */
    public function applyPurchase($actor, StoreItem $item, PurchaseHistory $old = null, PurchaseContext $context): string
    {
        $result = $this->getProvider($item->provider)->purchase($item, $actor, $old, $context);
        if (is_string($result)) {
            return $result;
        } else if (is_bool($result)) {
            if ($result == true)
                return "";
            $this->exceptionWith("xypp-store.forum.purchase_result.fail.cannot");
        } else if (is_array($result) && count($result) == 2 && is_bool($result[0]) && is_string($result[1])) {
            if ($result[0] == true)
                return $result[1];
            $this->exceptionWith($result[1]);
        } else {
            $this->exceptionWith("xypp-store.forum.purchase_result.fail.unknown");
        }
        // This code actually will never run. But the ide is always warning that not all path return a value.
        return "";
    }
    /**
     * Action when expire the item.
     * **This method MUST be called when delete a history model**
     * @param PurchaseHistory $item
     * @return bool
     */
    public function applyExpire(PurchaseHistory $item)
    {
        return $this->getProvider($item->provider)->expire($item);
    }
    /**
     * Check if the item is available to purchase.
     * @param \Flarum\User\User $actor
     * @param \Xypp\Store\StoreItem $item
     * @return bool|string
     */
    public function isAvailable(User $actor, StoreItem $item): bool|string
    {
        if (!is_null($item->rest_cnt) && $item->rest_cnt <= 0)
            return "xypp-store.forum.unavailable.common.no_rest";
        if (!$this->hasProvider($item->provider))
            return "xypp-store.forum.unavailable.common.unknown";
        return $this->getProvider($item->provider)->canPurchase($item, $actor);
    }
    /**
     * Get all providers that should be shown in history page
     * @return array
     */
    public function providersShowInHistory(): array
    {
        $ret = [];
        foreach (self::$extendProvider as $key => $provider) {
            if ($provider->canSeeInHistory) {
                $ret[] = $key;
            }
        }
        return $ret;
    }

    /**
     * Check if the item can be take only one.
     * @param \Xypp\Store\StoreItem $item
     * @return bool
     */
    public function isSingleHold(StoreItem $item): bool
    {
        if (!$this->hasProvider($item->provider))
            return false;
        return $this->getProvider($item->provider)->singleHold;
    }

    /**
     * Check if the item can be used. When $fe is true, it will decide if the item is shown can be used in frontend.
     * @param \Xypp\Store\PurchaseHistory|\Xypp\Store\StoreItem $item
     * @param bool $fe
     * @return bool
     */
    public function canUse(PurchaseHistory|StoreItem $item, bool $fe = false): bool
    {
        if (!$this->hasProvider($item->provider))
            return false;
        if ($fe && !$this->getProvider($item->provider)->canUseFrontend)
            return false;
        return $this->getProvider($item->provider)->canUse;
    }
    /**
     * Actions when use item
     * @param \Xypp\Store\PurchaseHistory $item
     * @param \Flarum\User\User $actor
     * @param string $data
     * @param \Xypp\Store\Context\UseContext $useContext
     * @return bool
     */
    public function useItem(PurchaseHistory $item, User $actor, string $data, UseContext $useContext): bool
    {
        if (!$this->hasProvider($item->provider))
            return false;
        return $this->getProvider($item->provider)->useItem($item, $actor, $data, $useContext);
    }

    /**
     * End the process with ValidationException with message translated.
     * @param string $e
     * @param array $param
     * @throws \Flarum\Foundation\ValidationException
     */
    public function exceptionWith(string $e, array $param = [])
    {
        throw new ValidationException(["error" => $this->translator->trans($e, $param)]);
    }
    /**
     * Translate a string.
     * @param string $e
     * @param array $param
     * @return string
     */
    public function trans(string $e, array $param = [])
    {
        return $this->translator->trans($e, $param);
    }
}
