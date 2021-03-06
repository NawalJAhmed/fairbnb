import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import './UserFeed.css';
// import "../SearchBad/SearchBad.css"

import Search from '../Search/index';
import SearchBad from '../SearchBad/index';

import FilterButton from '../FilterButton/index';
import FilterPrice from '../FilterPrice/index';

function UserFeed() {
  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');
  const [searchQuery, setSearchQuery] = useState(query || '');

  const queryFilter = new URLSearchParams(search).get('s');
  const [filterQuery, setFilterQuery] = useState(queryFilter || '');

  const queryFilterPrice = new URLSearchParams(search).get('s');
  const [filterQueryPrice, setFilterQueryPrice] = useState(
    queryFilterPrice || '200'
  );

  const sessionUser = useSelector((state) => state.session.user);
  const allListings = useSelector((state) => state.listings);
  const listingsArr = Object.values(allListings);

  const filterListings = (recListings, query) => {
    if (!query) {
      return recListings;
    }

    return recListings.filter((listing) => {
      const listingTitleSearch = listing.title.toLowerCase();
      const listingPriceSearch = listing.price.toString();
      const listingCitySearch = listing.city.toLowerCase();
      const listingPropertyTypeSearch = listing.propertyType.toLowerCase();
      return (
        listingPropertyTypeSearch.includes(query.toLowerCase()) ||
        listingCitySearch.includes(query.toLowerCase()) ||
        listingPriceSearch.includes(query.toString())
      );
    });
  };

  const recListings = filterListings(
    listingsArr.filter((listing) => listing.authorId !== sessionUser.id),
    searchQuery,
    filterQuery,
    filterQueryPrice
  );

  if (recListings.length) {
    return (
      <>
        <div className='searchBarAndResults'>
          {/* <h2 className='rec-title'>Recommended Listings</h2> */}
          <div className='barAndFilter'>
            <div className='topSearchBar'>
              <Search
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              <FilterButton
                filterQuery={filterQuery}
                setFilterQuery={setFilterQuery}
              />
              <FilterPrice
                filterQueryPrice={filterQueryPrice}
                setFilterQueryPrice={setFilterQueryPrice}
              />
            </div>
          </div>
          <div className='searchResults'>
            {/* <h2 className='rec-title'>
              {' '}
              There {document.querySelectorAll(".feed-list").length > 1 ? 'are' : 'is'} {document.querySelectorAll(".feed-list").length}{' '}
          {document.querySelectorAll(".feed-list").length > 1 ? 'listings' : 'listing'}.
            </h2> */}
            <ul className='allCards'>
              {recListings.map((listing) => {
                let d = new Date(listing.createdAt);
                let dateWritten = d.toString().slice(4, 10);
                if (
                  listing.propertyType === filterQuery &&
                  listing.price <= filterQueryPrice
                ) {
                  return (
                    <li key={listing.id} className='feed-list'>
                      <NavLink
                        className='listing-link'
                        to={`/listings/${listing.id}`}
                      >
                        <div className='neumorphic-card mx-auto'>
                          <div className='neumorphic-card__outer'>
                            <img
                              class='neumorphic-image'
                              src={listing.imageUrl[0]}
                              alt='listing'
                            />
                            <p className='neumorphic-card__title'>
                              {listing.city.slice(0, -5)}
                            </p>
                            <div className='propertyTypeAndPriceLine'>
                              <p className='neumorphic-card__text'>
                                {listing.propertyType}
                              </p>
                              <p className='neumorphic-card__text'>
                                $
                                {listing.price === 0
                                  ? listing.price + 1
                                  : listing.price}{' '}
                                / night
                              </p>
                            </div>
                            {/* <p className='neumorphic-card__text'>{dateWritten}</p> */}
                          </div>
                        </div>
                      </NavLink>
                    </li>
                  );
                } else if (
                  filterQuery === '' &&
                  listing.price <= filterQueryPrice
                ) {
                  return (
                    <li key={listing.id} className='feed-list'>
                      <NavLink
                        className='listing-link'
                        to={`/listings/${listing.id}`}
                      >
                        <div className='neumorphic-card mx-auto'>
                          <div className='neumorphic-card__outer'>
                            <img
                              class='neumorphic-image'
                              src={listing.imageUrl[0]}
                              alt='listing'
                            />
                            <p className='neumorphic-card__title'>
                              {listing.city.slice(0, -5)}
                            </p>
                            <div className='propertyTypeAndPriceLine'>
                              <p className='neumorphic-card__text'>
                                {listing.propertyType}
                              </p>
                              <p className='neumorphic-card__text'>
                                $
                                {listing.price === 0
                                  ? listing.price + 1
                                  : listing.price}{' '}
                                / night
                              </p>
                            </div>
                            {/* <p className='neumorphic-card__text'>{dateWritten}</p> */}
                          </div>
                        </div>
                      </NavLink>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className='barAndFilter'>
          <div className='topSearchBar'>
            <SearchBad
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <FilterButton
              filterQuery={filterQuery}
              setFilterQuery={setFilterQuery}
            />
            <FilterPrice
              filterQueryPrice={filterQueryPrice}
              setFilterQueryPrice={setFilterQueryPrice}
            />
          </div>
        </div>
        <h2 className='rec-title'>No Listings Match Current Search</h2>
      </>
    );
  }
}

export default UserFeed;
