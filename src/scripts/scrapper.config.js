export const selectors = {
    main: {
        profileImg: '.pv-top-card-profile-picture_image',
        contactInfoA: '#top-card-text-details-contact-info',
        contactInfoS: '.section-info',
        generalContainer: idRef => `#${idRef} ~ .pvs-list__outer-container > ul > li > div`
    }
}