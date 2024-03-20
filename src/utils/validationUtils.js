export const minLength = (t, bound) => t.length < bound;

export const isEmail = (e) => {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(e) === false;
}

export const isEmptyReview = (review) => review.description == "";
