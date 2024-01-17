+++
title = "Urbit Supervised Machine Learning Library"
date = "2021-08-25"
[taxonomies]
grant_type = ["Proposal"]
grant_category = ["App Dev: Other"]
[extra]
image = ""
description = "Create a supervised machine learning library"
reward = "7 stars"
assignee = ["~tamdev-nocdun"]
grant_id = "P0059"
completed = true
canceled = false
link = ""
+++

## Supervised Maching Learning Library for Urbit

## Purpose

I want to create the first supervised machine learning (ML) library on Urbit. Supervised machine learning enriches the platform and ecosystem by opening up an entirely new design space for applications. Having an ML capability improves Urbit's image as a contender in the personal server/app dev platform space. I have previously discussed this idea with Josh Lehman; this is a follow-up to that conversation.

Unsupervised ML is an equally valuable capability which should be scoped to a follow-on effort as it is a very large space with completely different components and applications.

This proposal is narrowly-scoped to:

(1) creating a library of popular supervised machine learning models

(2) creating a library for training and testing the models with relevant performance metrics

(3) a small "toy dataset" for getting started quickly with machine learning - based off of the [Iris dataset](https://scikit-learn.org/stable/auto_examples/datasets/plot_iris_dataset.html) which is a standard pedagogical tool for ML.

## User Stories

As a user, I can:

- Predict how strongly one set of factors are likely to impact another factor, by using Urbit + a regression model from this supervised ML library. For example - I can try to predict the price of Bitcoin (output variable) based on the last 3 days' rate of transactions to my Bitcoin wallet (hypothetical). Or, I can try to predict how many vcores to provision today for my Urbit node based on the last 3 days' CPU utilization.

- Classify data using Urbit + a classification model from this supervised ML library.

- Build supervised ML models using data that I own, by using Urbit + the train/test capability of this supervised ML library.

- Get started quickly with Urbit + supervised ML. The tutorial blog post breaks down the getting-started process into easy steps, and the pre-loaded Iris dataset makes it easy to get off the ground quickly.

## Milestones

### Milestone 1 - Initial ML library development

Expected completion: Sep 2021

Payment: 1 star

Create a library which supports instantiating an ML model from a list of parameters: linear regression, logistic regression, K nearest neighbors (KNN) regression/classification, and decision tree regression/classification. This is a significant effort which will enable regression and classification, two key supervised learning tasks for ML.

### Milestone 2 - Training and testing library

Expected completion: Oct 2021

Payment: 1 star

Create a library for training and testing the models created in Milestone 1. This comprises three key components:

(1) dataset resampling (train/test/validation split)

(2) training algorithms for the models in Milestone 1

(3) metrics for testing the models on the test and validation data subsets.

You cannot do ML without training and testing; training is how you get model parameters from data, and testing is how you confirm that your model's predictive performance generalizes to situations it was not trained on. This is a significant effort due to mathematical complexity and edge-cases involved in training. Furthermore, each model type in Milestone 1 has a different training algorithm which must be implemented. Key testing metrics include Accuracy and Confusion Matrix for classification and Mean-squared error (MSE)/ Mean-absolute error (MAE) for regression.

### Milestone 3 - Toy dataset

Expected completion: Nov 2021

Payment: 1 star

Create a library that loads a toy dataset modeled after the Iris dataset in scikitlearn. From my work on database product development, I know that having a "getting started" dataset is a must-have in order for users to adopt your product. This deliverable is a "getting started" dataset for working with the ML library; modeling after the existing Iris dataset from scikitlearn increases the likelihood of adoption because users are already familiar with this toy dataset.

### Milestone 4 - Mathematical plotting

Expected completion: Dec 2021

Payment: 1 star

Add a mathematical plotting capability to the supervised learning library. The Landscape UI would be an ideal vehicle for displaying datasets and visualizing the results of machine learning. A mathematical plotting library will help other users to build on top of the machine learning library.

### Milestone 5 - Getting started with supervised ML on Urbit

Expected completion: Jan 2022

Payment: 1 star

A tutorial blog post showing how to do supervised classification and regression using Urbit & the supervised ML library!

### Milestone 6 - Federated Learning

Expected completion: Feb 2022

Payment: 1 star

[Federated Learning](https://ai.googleblog.com/2017/04/federated-learning-collaborative.html) capability for Urbit. Applications of machine learning in social media suffer from the downside that a centralized entity owns your data. Federated Learning allows machine learning models to be trained on each individual's data, while striving to preserve the privacy of their data: an individual trains the model locally and shares the trained model with others in the network, such that their personal data never leaves their own server. Multiple individuals can collaborate to train a model on their own personal datasets, producing a model with better predictive power than if just one individual had trained it. As a machine learning strategy, Federated Learning is already gaining popularity as a way to train machine learning models on medical data, where each individual's personal metadata is PII or protected and cannot be directly shared with a centralized entity. For Urbit, which is attempting to supplant existing centralized and exploitative social media organizations, it is only logical to want a way to do ML that is privacy-preserving while still leveraging the value of many participants' data to attain performance. Thus the goal of this deliverable is to make a first-pass at a way to do Federated Learning by passing a machine learning model between two or more planets, progressively training it at each hop, before returning the trained model to the originator.

Because Federated Learning intersects with privacy and security concerns, I feel compelled to go a bit more in-depth on just this particular deliverable: as with anything involving privacy and security, expectation-setting is in order. This Federated Learning capability would be provided as-is, essentially as a "prototype" of how Federated Learning on Urbit _could_ work, making no warrantees of safety, security or reliability for a particular use-case, because I am not in the proper position as a freelance programmer with business insurance and 100% of my time to spend writing software which makes any such guarantees :) For users seriously considering Federated Machine Learning, there are a number of important considerations such as:

(1) How do you ensure that individual participants are not tampering with the ML training process locally, i.e. that a training computation was completed honestly?

(2) Do you need to encrypt the model in transit as it moves from participant to participant?

(3) Does training a model on a dataset leak information about that dataset to the originator of the request?

(4) From an IP perspective, are you alright with participants having access to your ML model in a partially-trained state?

I will absolutely not address any of the above questions in this work, though I am happy to suggest avenues of inquiry for how one might address them :) But nonetheless, no one in the Urbit community seems to have broached the topic of Federated Learning yet, so I think there is a strong value proposition in having me produce essentially a "prototype" of a Federated Learning capability, which can be extended later to address the above concerns, and which will help to start the conversation about privacy-preserving ML on Urbit.

### Milestone 7 - A prototypical example of privacy-preserving ML with Federated Learning on Urbit

Expected completion: Feb 2022

Payment: 1 star

A demonstration blog post showing an example of Federated ML. This serves three purposes: (1) help users to envision the future of Urbit as a privacy-friendly platform, while the tech is still in its infancy, (2) drive users to consume the ML library for their own projects, and (3) drive interest in augmenting or improving the ML library and the Federated ML capability.
