import React, { useCallback, useState } from 'react';
import { TopBar, ActionList, Icon, Text, Frame } from '@shopify/polaris';
import { ArrowLeftIcon, QuestionCircleIcon } from '@shopify/polaris-icons';

const Header = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const toggleIsUserMenuOpen = useCallback(
      () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
      [],
    );

    const toggleIsSecondaryMenuOpen = useCallback(
      () => setIsSecondaryMenuOpen((isSecondaryMenuOpen) => !isSecondaryMenuOpen),
      [],
    );

    const handleSearchResultsDismiss = useCallback(() => {
      setIsSearchActive(false);
      setSearchValue('');
    }, []);

    const handleSearchChange = useCallback((value) => {
      setSearchValue(value);
      setIsSearchActive(value.length > 0);
    }, []);

    const handleNavigationToggle = useCallback(() => {
      console.log('toggle navigation visibility');
    }, []);
    const logo = {
      topBarSource:
        'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
      width: 86,
      url: '#',
      accessibilityLabel: 'Shopify',
    };

    const userMenuMarkup = (
      <TopBar.UserMenu
        actions={[
          {
            items: [{content: 'Back to Shopify', icon: ArrowLeftIcon}],
          },
          {
            items: [{content: 'Community forums'}],
          },
        ]}
        name="Dharma"
        detail="Jaded Pixel"
        initials="D"
        open={isUserMenuOpen}
        onToggle={toggleIsUserMenuOpen}
      />
    );

    const searchResultsMarkup = (
      <ActionList
        items={[{content: 'Shopify help center'}, {content: 'Community forums'}]}
      />
    );

    const searchFieldMarkup = (
      <TopBar.SearchField
        onChange={handleSearchChange}
        value={searchValue}
        placeholder="Search"
        showFocusBorder
      />
    );

    const secondaryMenuMarkup = (
      <TopBar.Menu
        activatorContent={
          <span>
            <Icon
              source={QuestionCircleIcon}
              tone="base"
            />
            <Text as="span" visuallyHidden>
              Secondary menu
            </Text>
          </span>
        }
        open={isSecondaryMenuOpen}
        onOpen={toggleIsSecondaryMenuOpen}
        onClose={toggleIsSecondaryMenuOpen}
        actions={[
          {
            items: [{content: 'Community forums'}],
          },
        ]}
      />
    );

    const topBarMarkup = (
      <TopBar
        showNavigationToggle
        userMenu={userMenuMarkup}
        secondaryMenu={secondaryMenuMarkup}
        searchResultsVisible={isSearchActive}
        searchField={searchFieldMarkup}
        searchResults={searchResultsMarkup}
        onSearchResultsDismiss={handleSearchResultsDismiss}
        onNavigationToggle={handleNavigationToggle}
      />
    );

    return (
      <div style={{height: '100px'}}>
        <Frame topBar={topBarMarkup} logo={logo} />
      </div>
    );
};

export default Header;