<?php

namespace Xypp\Store\Console;

use Carbon\Carbon;
use Illuminate\Console\Command;
use Throwable;
use Xypp\Store\PurchaseHistory;
use Xypp\Store\Helper\StoreHelper;

class ExpireScheduleCommand extends Command
{
    /**
     * @var string
     */
    protected $signature = 'store:expire';

    /**
     * @var string
     */
    protected $description = 'Automatically remove item when expired.';

    public function handle()
    {
        PurchaseHistory::where('expire_at', '<', Carbon::now()->toDateTimeString())->get()->each(function ($item) {
            try {
                if (StoreHelper::applyExpire($item)) {
                    $item->delete();
                    $this->info("Expired item [" . $item->provider . "]" . $item->id . " from user" . "$item->user_id");
                }
            } catch (Throwable $e) {
                $this->error($e->getMessage());
            }
        });
        $this->info('Expire schedule completed.');
    }
}