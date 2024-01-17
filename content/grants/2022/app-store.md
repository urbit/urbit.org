+++

title = "App Store"
date = "2022-09-12"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["App Dev"]

[extra]
image = ""
description = "A tool for decentralized curation and discovery of urbit applications"
reward = "4 stars"
assignee = ["~dilryd-mopreg"]
champion = ["~hodzod-walrus"]
grant_id = "P0182"
completed = false
canceled = false
link = ""

+++

# App Store - Proposal

### Motivation

As an urbit user I want to be able to boot my ship and search for apps to download. I think that looking for apps through Groups is not the optimal solution. I want to be able to scroll through a page, find cool apps and easily download them. Non-technical and new-to-urbit users, especially, should be able to download apps and run them as smoothly as possible.

### Making It Decentralized

  My thinking started by looking at Google Play Store and figuring out how to create it on Urbit. But, Google Play is centralized - there is one curator (Google) for all the apps. Google is the one who both evaluates apps’ security (I hope), and is also responsible for curating which apps the users will see. Curation involves categories, recommendations, and search.

I envision multiple Curator Sites - essentially, anybody who is willing to put in the effort, can become a Curator. I see it somewhat analogously to Groups: when the user first boots the Groups app, he is recommended to join the Urbit Community group. App Store would have it similar - there would be one “default” Curator (possibly Urbit Foundation, or whoever the community decides it to be), and other Curators the users would have to discover themselves.

Right now, we don’t need more than one Curator as there are not as many apps. But in the future I could see Curators specializing in different types of apps (e.g. a curator for games, for utilities, …), I could see Developers or companies becoming Curators for themselves (making a Curator Site to showcase their own apps) and lastly, it is good to have the possibility of multiple “legitimate” sources of apps.

### Categories of Users
- User
- Developer
- Curator

### Categories of Service
- Curator Site
- App Page

### Apps to be Created
- App Store
- Curator Site Server
- App Page Server
    
### Basic User Story - Browsing and Downloading Apps
  
I see a user story going something like this: The User opens App Store. The User can add a Curator by clicking on a button “Add Curator” and inputting the Curator’s ship name. He sees multiple Curators which he added previously. He opens one Curator Site, and sees a list of apps, categorized by the Curator. If the Curator hasn’t created categories, it will display all apps.

A listing will contain an app icon, app name, a little description (added by the Curator), a direct download link, and a link to the App Page.

The Curator Site can also allow the User to search by app name, description, tags in the search box, sort by rating, and display apps by category.

The User finds an app he likes, clicks on it, and goes to a page containing information about the app. I will call this page App Page. He can also click on a link to download the app directly.

This requires:
- App Page hosting by Developers  
- Curator Site containing the data of the App Pages it displays, hosted by the Curator
- The User’s ship containing all the data of the Curators
  
### App Page

**Necessary Requirements**: The usual Urbit software distribution requirements should be listed: Desk Hash, Installed into (desk), Developer Desk, Last Software Update, License, Website, Version. There should be a “Get App” button.

**Default Template**: Contains all necessary requirements plus description, screenshots, instructions, possibly other.

The App Page should be customizable as long as it contains the Necessary Requirements.

### Developer User Story - Using App Page Server

The Developer enters the App Page Server app. There he can see a dashboard with all of his App Pages, displaying the comments and average rating of each. Each app has a delete and edit button next to it. App Pages are all served through App Page Server app, but the apps themselves can be hosted anywhere.

To create an App Page, he clicks an “add” button on the dashboard, and then he will have to fill the template. He should enter the desk name (which should already be published on Grid) and fill in the Default Template. When he is finished with creating/editing an App Page, he will be redirected to the main page (dashboard of his apps).

A Developer should have a separate App Page for each of his apps. If he wants to display them all in one place, he can create a Curator Site.

### Curator Site

**Necessary requirements**: Probably none. But likely all Curators will at least want to have hyperlinks to App Pages.

**Default Template**: Possibly Sphinx-like listings, containing app name, icon, host, and tag, with a hyperlink to its App Page. There can be a default set of tags, and the Curator can modify it as he sees fit.

On the back end, the Curator Site will be subscribing to App Pages, and gathering all their data to make searching and filtering possible.

Curator Sites should also be customizable.

### Curator User Story - Using Curator Site Server

The Curator enters the Curator Site Server app. On the main page he sees a list of Developers (whose apps he is displaying), an input box for a list of categories, and a list of apps which he is displaying.

The Curator can remove or add a Developer to his list of Developers. There will be a list of apps from that Developer, and the Curator can click on checkboxes of the apps he wants to display. These apps will automatically show up in his list of apps.

The Curator can input categories for the apps. If no category is input, then the default will be “all”. Categories will be assigned to apps.

The Curator can scroll through his list of apps, and each will have a “delete” and “edit” button next to it. The curator clicks on “edit” and then he can add his own description of the app and choose a category (based on those he input earlier). After confirming, his list will be updated and the Curator Site updated. He will then be redirected to the main page.

### Miscellaneous Considerations

- We don’t know how we would connect Grid software distribution with App Pages, whether it would be integrated or only hyperlinked.
- We don’t know how exactly will customization work. We want to make customizable CSS files for Developers and Curators which would be delivered to the Users.
    
### Milestones

Payment per milestone: 1 star

**Milestone 1** - Setting up the minimum back end. Only CLI for now.
ETA: October 7th 2022.

- The Developer should enter data basic info about his app through the command line.
- The Curator should subscribe to a Developer, and store all app data locally.
- The User should subscribe to a Curator, and be able to access data about apps locally.

**Milestone 2** - Building up the features in the back end. Still only CLI.
ETA: November 4th 2022.

- The Developer can now enter the whole App Page model, which includes a full set of metadata. He can edit and delete App Pages.
- The Curator can now add and delete categories, choose which apps to showcase, add and edit their own text/comment about the app.
- The User can now subscribe and unsubscribe from curators effectively, leave ratings and comments, and share the app.
- Designing all of the front end components and layouts of App Store, Curator Site Server and App Page Server in Figma, as described in detail in the User/Developer/Curator stories.
    
**Milestone 3** - Building the front end and connecting it to the back end.
  ETA: December 2th 2022.

- Building the front end in ReactJS according to our design from Milestone 2.
- Connect the front end to the back end, so that all roles can do everything they did in Milestone 2, but through a UI
- Add a search bar on the front end. It will be able to search by app name, Developer ship ID, tags, and possibly also pattern match through app descriptions.    

**Milestone 4** - Groups discovery and mobile view optimization.

- As a curator, I want to list groups in my collection for users to browse
- As a user, I want to browse through a list of groups that a curator recommends to me
- As a user, I want to see a group’s name, description, and host, and join the group easily from the app store
- As a user, I want a mobile-optimized experience the app store so I can easily use the app inside the EScape mobile app or in a mobile browser
- App Store will be published and downloadable on urbit
- There will be detailed documentation for App Store, describing how it works and how to use it
- A github pull request will be submitted to [https://urbit.org/applications/submit](https://urbit.org/applications/submit)
     
### About Us

I was looking for stuff to do which might actually do some good for the world. So here I am. My name is Jurij Jukić, ~dilryd-mopreg. I have about a year of programming experience, mostly in Python. I recently quit my job to come work on Urbit full time. I just finished App School Live and I’m looking to build and learn.

Joining me is Adrián Muñoz, ~hacpur-parbes. He has about a year of programming experience mainly in JavaScript (full stack) and a little bit of Python, Java and C#. He will primarily contribute to the front-end. He will learn Hoon as we go.

### Future Considerations

The App Store which I described as a proposal for me to build is nowhere near the full potential of App Store. I see many other avenues for improvement in the future, and I don’t want to bite off more than I can chew. Anyways, here are some things which could be built in the future.

**Payments:** Developers should be able to sell their apps. There is a possibility of integration with books.

**Distinguishing Trusted from Unsafe/Malicious Software:** I am unfamiliar with how software security audits usually work, but still, here is one completely unbaked idea.
  
There are people who evaluate software - let’s call them Evaluators. There can be a part of the App Page where Evaluators can give technical reviews of the app. So when people go to App Page they will see which Evaluators have “approved” the app. The Evaluators’ reputation should be at stake here.

This would somehow work by Users deeming Evaluators trusted. And Users could also deem other Users as trusted, so there could be a chain of trust, trackable to the Evaluator himself. I see this working together with pals. There is a lot more to think about here.
