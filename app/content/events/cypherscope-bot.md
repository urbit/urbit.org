+++
title = "Cypherscope Bot"
date = "2021-09-13"
[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Apps"]
[extra]
image = ""
description = "On-demand financial charts chat bot"
reward = "2 stars"
assignee = ["~mitten-dapper", "~ristyc-ridwyx"]
grant_id = "P0054"
completed = true
canceled = false
link = ""
+++

## Cyperscope Bot - an on-demand financial charts chat bot

Urbit chat bot that provides on-demand financial charts based on [this bot](https://www.alphabotsystem.com/guide/charting)

We expect to have a Ship or a Moon for our bot that answers incoming commands by replying with a chart image queried from the TradingView API.

## User flow

- User queries our bot by typing a command into chat like “chart btcusd 1h”.

  -- Command parameters include ticker, timeframe (optional), candle type (optional), indicators (optional).
  -- We’ll attempt to match AlphaBot’s available parameters (at the bottom of [this page](https://www.alphabotsystem.com/guide/charting).
  -- More command parameters will potentially be added based on time constraints and feasibility.

- Chatbot framework relays message to our bot (Cypherscope ship).

  -- [Chatbot framework](https://github.com/robkorn/urbit-chatbot-framework)

  -- Our bot is ideally a chat participant.

  -- If our bot does not understand the command, return a helpful error message.

- Bot parses the command and queries TradingView API for a chart.

- Bot sends a message in chat with the chart image.

  -- The images may be hosted on our ship. This part is a little unclear as of now.

  -- The chart should have a consistent and unobtrusive size every time. TradingView API might already handle this.

  -- Users should be able to delete the chart from the chat to avoid disrupting the flow of conversation.

## Risks

For transparency we have the following open questions and will dive deeper to resolve them:

- Where are images hosted and for what time period?

- How should the hardware running the ship be paid for?

  -- If this project catches on we could add a paid tier with more features, accepting payment in crypto to our bot’s ship.

- How should the TradingView chart API be paid for?

## Milestones

Milestone 1: Bot prototype + Moon deployment

Estimated completion: 2 week

Payment: 1 star

Create chatbot that responds to incoming messages in the format of "c {ticker} {time interval}" and return a chart image with relevant financial data. The bot should fetch data for any asset supported by TradingView API, such as stocks, crypto, forex, or metals. Deploy this prototype bot to a Moon.

Modify the chatbot framework we're using so that our Moon reacts when it is added to a new chat. When added, the bot displays a welcome message + menu. Add "c help" command for a full list of the bot's features. Ensure improper inputs like "c nonexistentTicker" returns a helpful error message.

### Milestone 2: Accept payments

Estimated completion: 2 weeks

Payment: 1 star

Allow bot to accept payment to the Moon it is hosted on to pay for upgraded features. Create chat interface so users of our bot can upgrade or downgrade seamlessly.
