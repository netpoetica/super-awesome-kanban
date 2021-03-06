/* eslint-disable no-unused-vars */

/**
 * This will populate values in database.
 */
function seedDB(callback) {
  const cardData = [
    {
      name: 'Style should look awesome',
      description: 'awesome-ish?',
      status: 'DONE',
    },
    {
      name: 'Cards should be in respective columns',
      description: 'Each individual Card has a different status, one of `TODO`, `DOING`, and `DONE`, but currently all cards are rendered in the `TODO` column. Please ensure the cards are placed in the column accordin to their category.',
      status: 'TODO',
    },
    {
      name: 'Add "delete" button to cards',
      description: 'Add a new button component that can be rendered in the Card component to delete each individual card from the database.',
      status: 'TODO',
    },
    {
      name: 'Add "add" button to columns',
      description: 'Add a new button component that can be rendered in each Column to add a new Card of the given status. That is, if the user presses this button on the `DOING` column, the card will have a default status of `DOING`. Cards added in this way should show up in their respective columns.',
      status: 'TODO',
    },
    {
      name: 'Cards in columns should be sorted',
      description: 'Cards in columns should be sorted by the `createdDate` property on the card. Note: they are stored as UNIX timestamps in the database, generated by JavaScript\'s `Date.now()`.',
      status: 'TODO',
    },
    {
      name: 'User should be able to change status of cards',
      description: 'The user should be able to change the status of a card between `TODO`, `DOING`, and `DONE`, and changing the status should cause them to render in their respective columns (i.e. all cards with `TODO` status should be in column with Todo header',
      status: 'TODO',
    },
    {
      name: 'Bonus: Allow updates',
      description: 'A card can be edited and saved (`.updateCard()`)',
      status: 'TODO',
    },
    {
      name: 'Should be super fun',
      description: 'We hope!',
      status: 'DOING',
    },
    {
      name: 'Demonstrate your capabilities',
      description: 'DOING',
      status: 'TODO',
    },
  ];

  // Add all cards to db, then set state.
  KanbanDB.connect().then((db) => {
    Promise.all([
      ...cardData.map((card) => db.addCard(card)),
    ]).then(() => {
      db.getCards().then((cards) => {
        if (typeof callback === 'function') {
          callback(cards);
        }
        // Disconnect aka kill reference.
        db.disconnect();
      });
    });
  });
}
