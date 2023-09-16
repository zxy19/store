import Page from 'flarum/common/components/Page';
import IndexPage from 'flarum/forum/components/IndexPage';
import listItems from 'flarum/common/helpers/listItems';

export default class StorePage extends Page {
    view() {
        return (
            <div>
                {IndexPage.prototype.hero()}
                <div className="container">
                    <div className="sideNavContainer">
                        <nav className="IndexPage-nav sideNav">
                            <ul>{listItems(IndexPage.prototype.sidebarItems().toArray())}</ul>
                        </nav>
                        <div class="StoreListContainer">
                            <h2>开发中</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
