+++

title = "Trail"
date = "2022-10-27"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["App Dev"]

[extra]
image = ""
description = "An application for tracking and reviewing your outdoor workouts via a native mobile OS application, a webapp, and an Urbit backend for your sensitive location data"
reward = "4 stars"
assignee = ["~hanryc-tirpur"]
champion = ["~famhut-wolpyx"]
grant_id = "P0197"
completed = false
canceled = false
link = ""

+++

# Trail - An Outdoor Activity Tracker for Urbit
Outdoor workout trackers, especially when including social features, generally require users to submit sensitive location data to their servers. With %trail, an Urbit user can keep control over their sensitive location data with their own secure, private server. In addition, social features, such as workout challenges, will not require revealing a user’s social graph to a third party.
## App UI
Due to the nature of location tracking and map displays in mobile, it would seem best to have two different UIs depending on the context.
When out in the world and recording a run/bike ride/hike, the user should be using a native mobile experience.
When on a laptop reviewing previous exercises, a user would be using grid (browser), and therefore, will not have the capability to record exercise.
## Gall app API
The Gall App API will be documented clearly using the `%docs` app, and will address the following considerations:
- The %trail gall agent should be kept as small as possible.
- There are many possible data sources, implying that the %trail gall agent should not include data source parsing knowledge
- Not all users will care about all data sources. This implies:
    - Data sources should be separate from the %trail gall agent
    - There should be a mechanism to register their existence with the main gall agent
    - There could be 3rd party data source parsers that can be install separately from the %trail desk
- Indoor and outdoor activities will need to be treated differently.

### Milestones & Compensation

**Milestone 1: Gall app backend**

*1 Star, Estimated delivery date: November 30, 2022*

Pokes
- `%start-activity`: Starts an activity, making it available to receive location information.
- `%save-path`: Saves a list of locations to the currently active activity.
- `%stop-activity`: Stops an activity, but will allow activity to be continued at a later time.
- `%end-activity`: Ends an activity and will not allow further updates.
- `%delete-activity`: Deletes an activity.
- `%save-settings`: Saves settings, including whether distance should be measured in miles or km
Peeks
- View details of a previously completed activity
/sur
```
|%
+$  id  @
+$  timestamp  @
+$  activity-type  ?(%bike %walk %run)
+$  distance-unit  ?(%mile %km)
+$  settings  [unit=distance-unit]
+$  location
  $:  =timestamp
      lattitude=@rs
      longitude=@rs
      altitude=@rs
      heading=@rs
  ==
+$  activity
  $:  =id
      =activity-type
      segments=(list segment)
      total-distance=@rs
      total-elapsed-time=@rs
  ==
+$  activity-summary  [=id total-distance=@rs total-elapsed-time=@rs]
+$  segment
  $:  start-time=timestamp
      end-time=(unit timestamp)
      path=(list location)
      distance=@rs
      elapsed-time=@rs
  ==
+$  activities  ((mop id activity) gth)
+$  action
  $%  [%start-activity =id =activity-type]
      :: [%stop-activity =id path=(list location)]
      :: [%end-activity =id path=(list location)]
      :: [%delete-activity =id]
      [%save-settings unit=distance-unit]
      :: [%save-locations =id path=(list location)]
  ==
+$  update
  $%  [%activities list=(list activity-summary)]
      [%activity =activity]
  ==
--
```

**Milestone 2: Basic outdoor workout tracking on iPhone**

*1 Star, Estimated delivery date: December 31, 2022*

- Choose between metric and imperial unit systems
- Live tracking of an outdoor workout
- Path on map updates as user moves
- Displays current pace, total distance, average speed
- View summary of previously completed workouts
- View details of a previously completed workout

**Milestone 3: Grid application developed in React**

*1 Star, Estimated delivery date: January 15, 2023*

- View summary of previously completed workouts
- View details of a previously completed workout
- Edit workout
- Can modify the time of the workout to remove a time period at the end of a workout

**Milestone 4: Ingest data from various sources**

*1 Star, Estimated delivery date: January 31, 2023*

- Ingest data from common activity file types
    - Create gall agent
        - Parse Strava data and save to %trail agent
        - Parse .gpx files
        - Parse .tcx files
    - Grid UI
        - Ability to enter Strava API access token
        - Ability to upload files to be parsed
- documentation of agents delivered via `%docs`
- App Ecosystem listing submitted via https://urbit.org/applications/submit

## Future Integrations
When more of the base layer of health applications get built out, there are some exciting features that can be created by combining data from other apps.
- A workout routine / training program. This app could also include weightlifting programs as well as cardio.
    - Integrates with 
        - Calendar
        - Groups
    - Can be used by:
        - Users can develop their own routines
        - Personal trainers can provide users with custom routines
- Exercise challenges. Challenge your friends to see who can accumulate the most miles in a month
    - Integrates with
        - Calendar
        - Groups
        - Chat
        - %pals / %whom
    - Can be used by
        - Groups
- Spin class. Join a decentralized spin class
    - Integrates with
        - Web RTC
        - Exercise bike
        - Groups
    - Can be used by
        - Spin class instructors
- Calorie estimation
    - Integrates with
        - Heartrate
        - Weight

## About Me
I am a recent Hoon School Live and App School Live graduate. I also have 18 years of experience developing web apps and APIs using various back-end technologies including .NET and node.js, as well as modern JavaScript front-end frameworks including React/Redux, Vue, and Svelte over the past 6 years.
As importantly, I am extremely passionate about having fitness tracking and biometric data integrated with Urbit. It was the first use case that came to mind while reading the initial blog post describing Urbit.


