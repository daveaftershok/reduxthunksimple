/* Action creators */

// Actions (returned from creators) will be dispacthed by the component

export function itemsHasErrored(bool) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}

export function itemsFetchDataSuccess(items) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}

/*

By default, Redux action creators don't support asynchronous actions like fetching data, so here's where we utilise Redux Thunk. 

Thunk allows you to write action creators that return a function instead of an action. The inner function can receive the store methods dispatch and getState as parameters, but we'll just use dispatch.

*/

// Now, here is why Action Creators are different to Actions and do not necessarily have a 1:1 relationship: we need a fourth action creator that calls our 3 other action (creators) depending on the status of fetching the data. 
export function itemsFetchData(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(itemsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(itemsFetchDataSuccess(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}


export function itemsRemoveItem(index) {
    return {
        type: 'ITEMS_REMOVE_ITEM',
        index
    };
}