## Get Started

### Prequesties

make sure you have:
- [Git](https://git-scm.com/)
- [Nodejs](https://nodejs.org/) version v16.18.0 or higher (we recommend using
  [nvm](https://github.com/nvm-sh/nvm))

### Run it locally

- Clone the repository:
```sh
git clone https://github.com/abderrahmaneMustapha/BidWeb.git
```

- Make sure you are in the root of the repository
```sh
cd BidWeb
```
- For the frontend part go to 
```
cd bid-web
````

- For the backend part go to 
```
cd bid-api
````

- And then run the command below in both directories to install dependencies.
```
npm install
````

- go to `bid-web` search for `.env.example` rename it to  `.env`
- go to `bid-api` search for `.env.example` rename it to  `.env`

- run `npm run dev` in `bid-api`
- run `npm run start` in `bid-web`
- run `npm run swagger` in `bid-api` to genrate swagger documentation

## Additional Detals:

I wanted to add some details about how i handled the case when the bid
is a closed for an item, and how notified a rewarded this specific item for
the user with the highest bid.

First, all the users can not bid on an item when the bid is closed (when item
bid close date and time is less than the current date and time).

Second, a cron job is running each 5 minutes ( it can be changed by modifying
the .env variables) and then check for all the closed items in the previous
30 minutes (this can be customized by changing the .env variables too) if they
are rewarded to their users or not.

If yes an emails will be sent to the user who won the bid, and the other users
who  lost the bid will get notified that they have lost the bid on this item.
