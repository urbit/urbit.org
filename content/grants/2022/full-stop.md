+++

title = "Full Stop"
date = "2022-08-17"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["App Dev"]

[extra]
image = ""
description = "A Menstruation Tracker for Urbit"
reward = "5 stars"
assignee = ["Quartus"]
champion = ["~tocrex-holpen"]
grant_id = "P0172"
completed = false
canceled = false
link = ""

+++

# Background

Full Stop is a menstruation tracker for Urbit. Using Full Stop, users can record data, directly to their secure, personal server, about their periods (start, stop, flow, etc.) and sexual activity. Users will have discrete, fully private access to their health data through the Full Stop app which will be available on popular mobile phone operating systems.

# Rationale
Access to health care for menstruating people is distributed inequally, geographically. In some countries, access to various reproductive health care procedures is legislatively restricted, or criminalized. Many countries are still involved in internal political struggles to define the contours of access to reproductive health care, and where political favor changes, people who are tracking their period in that country are subjected to uncertainty and doubt, not to mention existential dread resulting from the fact that their body is, as it seems, someone else's choice.
[Recently](https://www.theverge.com/2022/6/30/23190142/delete-period-tracking-app-roe-v-wade-how-to#:~:text=Even%20if%20the%20app%20doesn,request%20to%20delete%20your%20account.), [potential changes to reproductive health care access in the United States](https://www.theguardian.com/world/2022/jun/28/why-us-woman-are-deleting-their-period-tracking-apps) have [led people with periods](https://www.nytimes.com/2022/06/30/technology/period-tracker-privacy-abortion.html) to delete their [digital period trackers from their devices](https://www.houstonchronicle.com/lifestyle/renew-houston/health/article/Period-tracking-apps-spark-panic-after-Roe-v-17279151.php) out of concern that data provided to such apps could be used by State actors to identify pregnancies and, moreover, potential, unexpected terminations of pregnancies, for use in criminal prosecutions (under a theory of abortive health care illegality).

[Deleting Your Period Tracker Won’t Protect You](https://www.nytimes.com/2022/06/30/technology/period-tracker-privacy-abortion.html)

Period tracking app Flo (no relation to Progressive) has recently announced that it is ["developing a new feature called 'anonymous mode' that will allow users to remove their name, email address, and technical identifiers from their profile".](https://www.npr.org/2022/06/30/1108814577/period-tracker-app-flo-privacy-roe-v-wade) iOS App Store #1 period tracker Stardust (astrology tie-ins) has a privacy policy that explicitly states that it [will turn over data to authorities **whether required by law, or not**.](https://www.vice.com/en/article/y3pgvg/the-1-period-tracker-on-the-app-store-will-hand-over-data-without-a-warrant)

[The #1 Period Tracker on the App Store Will Hand Over Data Without a Warrant [UPDATED]](https://www.vice.com/en/article/y3pgvg/the-1-period-tracker-on-the-app-store-will-hand-over-data-without-a-warrant)

Even the [EFF has identified that, while it might not be necessary to delete a period tracking app, users should become familiar with the privacy policy of the app and make sure that it aligns with their risk profile.](https://www.eff.org/deeplinks/2022/06/should-you-really-delete-your-period-tracking-app) Further, they recommend considering all apps as a *permeable surface through which data about a potential pregnancy could leak* (suggesting that users should use E2E encrypted messaging, etc, as an additional security measure).
At the risk of sounding flippant, Urbit fixes a great deal of this for users without interrupting their computing experience. Urbit provides an encrypted communication layer with identity primatives (affording identity assurances in comms). Urbit also acts as a personal server, avoiding the concern of corporate leaks of biometric data entirely. And yet, Urbit is available on a user's Phone as an interface for inputting data, maintaining the convenience of otherwise-centralized services. A period tracker on Urbit is simple solution to a very complex problem. It also presents some interesting development questions, reviewed below.

# Overview
Full Stop helps you track your period and period-related-accessory-phenomena on a secure, private, personal server called an urbit. **Full Stop** is accessed like a traditional phone application, available on major phone operating systems. **Full Stop** will include basic Push Notifications which will, given the need to pass through Apple's Great Filter, never include private information and should provide no indicia of a user's health conditions (or lack thereof) in their frequency or rate of occurrence.
**Full Stop** should provide a variety of secure methods for accessing and inputting data, including a web-app, asynchronous apps built by core devs and 3rd parties, etc. If users don't trust the in-the-box web-app, they should be free to construct their own.
Through whatever front-end the user chooses, Full Stop's available functions will track with most period tracker applications currently on the market:
### Recording Data
- **Period Data:** The user can record information about their period.
    - Start and Stop dates
    - Flow rate per day, during period
    - Physical Symptom checklist per day
- **Sexual Activity Data:** The user can record information about any sexual contact they may experience.
    - Date of encounter
    - Use or non-use of additional contraceptive protection (e.g. condoms)
    - User's partner's @p (kidding)
- **Additional BioMarkers:** The user can record period-adjacent data they may wish to record.
    - Off-period spotting
    - Birth Control Pill consumption tracker
    - Term Birth Control application and renewal date tracker (e.g. IUD)
 - **Pregnancy Tracking:** The user can record information about their pregnancy, and track the weeks until their due date.
   - User can set a due date from the date of the start of the pregnancy or their projected due date.
   - The application will provide the user with a count of weeks since the start of their pregnancy.
- **Fertility Prediction:** The user can elect to view various projections of fertility windows based on their prior period data, as an aid for con(tra)ception.
   - Methods include timing methods and, later, application of basal body temp and cervical mucosal density data inputted by the user to further specify fertility windows 
### Reviewing Data
- **Data Visualization:** Visualize cycles over time, along with predictive models of likely windows of fertility, hormonal activity (based on current medical literature), and the likely window of the user's next period.
- **Orientation Assistance:** Should a user choose, Full Stop will assist them in planning sexual encounters to most likely result or not result in a pregnancy
    - **Full Stop** will incorporate several methods of timing contraception users can select from including those proscribed by various women's health organizations as potential alternatives to hormonal or physical birth control options (the 'Rhythm Method', Natural Family Planning, the Standard Day method).
    - **Full Stop** will also incorporate available ovulation/fertility window timing algorithms users may select from, to assist them in becoming pregnant.
### Outputting Data
- Application data should be available for use in other applications, pending inter-app-permissions development.
## User Stories
As a user, I can:
- Download an iOS/Android App from the app store,
- Point my phone app at an Urbit (by IP or URL) and enter my `+code` to connect the app to their Urbit,
- Track my period within the application including:
    - Start Date,
    - Stop Date,
    - Flow Rate per Day,
    - Physical Symptoms (pain, cramping, clotting, etc.),
- Track my sexual activity within the application including:
    -Sexual Contact Date,
    -Use/Non-Use of Prophylactic,
- Track additional biomarkers related to menstruation:
    - Off-Period Spotting,
    - Birth control pill consumption,
- Track the weeks of my pregnancy
- Project my fertile days based on my own data stored on my secured server
- Receive push notifications from the application as reminders, but where such notifications must'n't leak data about the users potential medical conditions, including potential pregnancies,
- Review my tracked data in a visually appealing format, in application,
- Receive assistance from the application in timing my sexual contact to encourage/avoid pregnancy,
    - Select from available methods to promote/dissuade pregnancy, according to my beliefs and preferences,
- Output data from Full Stop to a format I can share with a medical provider or other trusted party.

## Schedule/Compensation
### Milestone 1 - Research Review + Focus Grouping
- Research Completed
    - Methods of timing contraception, fertility promotion
    - Required data points for medical professionals
    - Validity of hormonal predictions
- Pre-Work Focus Group
    - Interview several period havers regarding their preferences in a period tracker
    - Include diverse potential users
- Wireframe Focus Group
    - Complete a wireframe and workshop it with the same or similar set of participants as in pre-work focus group
Compensation: 1 star
### Milestone 2 - Functioning Gall Agent
- Gall Agent Feature Complete
    - Features as required to promote FE User Stories described above
    - Researched Bio-Markers coded into Back End (hormone cycles, pregnancy avoidance/promotion methods introduced)
Compensation: 2 stars
### Milestone 3 - Front-End Complete, Deployed
- FE available on iOS App Store
- FE available on Android App Store
- FE available through EScape App/Web Browser
Compensation: 2 stars

## Research Questions
1. Are Period Trackers "Goal Oriented"?
- It seems obvious, from an external perspective, that many users of a Period Tracker are, in addition to tracking their general health, tracking their period specifically to identify, promote or inhibit pregnancy as a result of sexual activity.
```
- However, varying groups of period-havers may maintain variant beliefs vis-a-vis natalism
- Does this distinction result in a proliferation of targeted-intent Period Trackers?
- Are there a cohort of 'help me get pregnant' and a separate cohort of 'do not let me get pregnant' trackers in the market?
- Could users with strong feelings pro/anti-natalist use an app that asked them to ascribe their intent, being otherwise fully willing to help them with both/either?
- Should the app just stay out of it?
```
2. What Does The Literature Say?
- Medical Literature will likely prescribe an array of good-to-know metadata in addition to basic timing, flow data that most apps track.
- **Full Stop** should allow, but not require, users to provide comprehensive good-to-know data to their medical professional for review, should they so choose.
3. What is the current understanding of generic hormonal cycle fluctuations during the course of a single menstruation cycle (i.e. FH, Progesterone, Estrogen fluctuations per 28 days, etc.), and are these generic enough to represent to users without introducing confusion? i.e. will period havers with PCOS find these "fluctuations" to be representative of the truth or merely confusing as they adjust to irregular cycles
4. What is the state-of-the-art discourse in religious communities regarding family planning with timing methods?
5. What is the state-of-the-art discourse in secular communities regarding family planning with timing methods?
6. What is the state-of-the-art fertility discourse regarding timing methods?