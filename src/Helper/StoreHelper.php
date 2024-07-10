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

class StoreHelper
{
    private static array $extendProvider = [];
    public static function addProvider(AbstractStoreProvider $provider): void
    {
        self::$extendProvider[$provider->name] = $provider;
    }

    protected $translator;
    public function __construct(Translator $translator)
    {
        $this->translator = $translator;
    }

    public function getProvider(string $name): AbstractStoreProvider
    {
        if (!isset(self::$extendProvider[$name])) {
            throw new ValidationException(["provider" => $this->translator->trans("xypp-store.forum.provider.error.title")]);
        }
        return self::$extendProvider[$name];
    }
    public function hasProvider(string $name): bool
    {
        if (!$name)
            return false;
        return isset(self::$extendProvider[$name]);
    }
    public function getAttrData(StoreItem $item): array
    {
        if (!$this->hasProvider($item->provider))
            return ['_unavailable' => true];
        return $this->getProvider($item->provider)->serialize($item);
    }
    public function getAttrHistory(PurchaseHistory $item): array
    {
        if (!$this->hasProvider($item->provider))
            return ['_unavailable' => true];
        return $this->getProvider($item->provider)->serializeHistory($item);
    }
    public function applyPurchase($actor, StoreItem $item, PurchaseHistory $old = null, PurchaseContext $context): string
    {
        $result = $this->getProvider($item->provider)->purchase($item, $actor, $old, $context);
        if (is_string($result)) {
            return $result;
        } else if (is_bool($result)) {
            if ($result == true)
                return "";
            else
                $this->helper->exceptionWith("xypp-store.forum.purchase_result.fail.cannot");
        } else if (is_array($result) && count($result) == 2 && is_bool($result[0]) && is_string($result[1])) {
            if ($result[0] == true)
                return $result[1];
            else
                throw new ValidationException(["error" => $this->translator->trans($result[1])]);
        } else {
            $this->helper->exceptionWith("xypp-store.forum.purchase_result.fail.unknown");
        }
    }
    public function applyExpire($item)
    {
        return $this->getProvider($item->provider)->expire($item);
    }
    public function isAvailable($actor, $item): bool|string
    {
        if (!is_null($item->rest_cnt) && $item->rest_cnt <= 0)
            return "xypp-store.forum.unavailable.common.no_rest";
        if (!$this->hasProvider($item->provider))
            return "xypp-store.forum.unavailable.common.unknown";
        return $this->getProvider($item->provider)->canPurchase($item, $actor);
    }
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
    public function isSingleHold($item): bool
    {
        if (!$this->hasProvider($item->provider))
            return false;
        return $this->getProvider($item->provider)->singleHold;
    }
    public function canUse($item, $fe = false): bool
    {
        if (!$this->hasProvider($item->provider))
            return false;
        if ($fe && !$this->getProvider($item->provider)->canUseFrontend)
            return false;
        return $this->getProvider($item->provider)->canUse;
    }
    public function useItem(PurchaseHistory $item, User $actor, string $data, UseContext $useContext): bool
    {
        if (!$this->hasProvider($item->provider))
            return false;
        return $this->getProvider($item->provider)->useItem($item, $actor, $data, $useContext);
    }

    public function exceptionWith(string $e)
    {
        throw new ValidationException(["error" => $this->translator->trans($e)]);
    }
}
