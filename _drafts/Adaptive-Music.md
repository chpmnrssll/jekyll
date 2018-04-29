---
layout: post
# image: backgrounds/jekyll-github.jpg
title: Adaptive Music
sub-title:
# date: 2017-10-21T00:00:00.000Z
tags: Adaptive Music, Composition
category: [ Demo ]
---
# Top 6 Adaptive Music Techniques in Games - Pros and Cons

## Introduction – Adaptive Music
In this article we begin to break down which situations a composer might choose one adaptive technique over another.  This doesn’t preclude the fact that many games utilize more than one adaptive music technique at the same time.  But if we, as composers, are going to get better at writing music for games, then it’s worth organizing some general guidelines for the use of each technique.

This article focuses primarily on techniques which utilize pre-composed stems of music to create interactivity and does not discuss specific implementation through the use of audio middleware.  All of the techniques described are generally available in modern middleware engines.

While there are interesting newer adaptive music techniques on the horizon which have more granular changes (moment to moment) such as the Dynamic Percussion System by Intelligent Music Systems or musically intelligent transition points such as the ones found in the audio middleware Elias, we’ll be focusing on current commonly used techniques used in adaptive music for video games.  Similarly this article will not discuss dynamically generated music techniques for games such as algorithmic composition.  Lastly, it should be noted that many of these advanced techniques can be added and applied to the following common adaptive techniques including techniques such as randomization.

When evaluating whether to use one of these techniques, you should not just add up the number of advantages and disadvantages to determine which method you should use for your game.  Evaluate your game, and see what methods best suit the end product.  The individual advantages and disadvantages are more important than the quantity of pros and cons.

### Method 1: Vertical Remixing (Layering)
Vertical Remixing is the adaptive technique where composers break up a music cue into two or more musical layers.  Layers can be broken down by instrument family, or by musical function (Making Full Use of Orchestral Colors in Interactive Music by Jim Fowler.)

The game developer works with the composer to figure out which game events trigger the layers to enter and exit.  These are called control-inputs (see my article – Control-Inputs: How the Game Engine Communicates with Your Score.)

The more layers the music has, the more control-inputs are required from the game.  Many games just employ two layers, one for exploring and then another one that gets added for combat making it easier for the programming team.  Although, more layers mean greater diversity in the adaptive music allowing for more emotional range moment-to-moment than just two states.

The length, tempo map, and harmonic framework of each layer is generally the same although there are exceptions which we won’t go into in this article.  These layers are then added or subtracted based on gameplay events.  In most cases, the layers are either on or off.  But, in some cases the volume of a layer might be variable, for instance the volume might be based on the distance from the player to an enemy, or the distance to a finish line.

Prominent games that use vertical remixing include Red Dead Redemption, Portal 2 and Fallout New Vegas.

#### Vertical Remixing Advantages
- Immediate changes to the music based on a game event.
- Less impactful to the listener than switching to an entirely new music cue, e.g. the change is more subtle.

#### Vertical Remixing Disadvantages
- Musical phrases can be easily interrupted (a melody is faded in or out in the middle of a phrase)
- When fading in or out layers it can sound non-musical, e.g. the New York Philharmonic doesn’t fade-in a group of parts except through a well-written crescendo by the composer.  
- Inability to change the tempo or harmonic map, e.g. the score can’t suddenly change from a major key to a minor key based on game event.
- Sometimes the layer that the game is fading in doesn’t have a lot of musical content leaving the game developer to wonder – did anything actually happen?

#### Scenarios
Vertical remixing is often used when a state changes from one state to another are shorter than 30 seconds.  For instance if you’re playing an open world game where there are short combat scenarios, it’s better to bring in a layer of music for :15 seconds as opposed to switching to an entirely different music cue which might get repetitive if the player is rotating through explore-combat often.

Vertical remixing is often used when solving puzzles within games.  Completion of each phase of the puzzle might bring in a new layer of the music indicating to the player that he’s progressing in the puzzle (Portal 2, and Legend of Zelda: Ocarina of Time).


## Horizontal Re-sequencing
Horizontal re-sequencing is a method of adaptive composition where the music is dynamically pieced together based on the actions of the player.  This technique queues up the individual music cues dynamically one after another based on player decisions and outcomes similar to the creation of a playlist within iTunes.

There are actually many different methods of horizontal re-sequencing from simply cross-fading between music cue and another, to playing a bridge transition between two cues.  When using horizontal re-sequencing techniques It should be noted that frequently composers have multiple start points for individual music cues increasing the variety of musical transitions.  Below you’ll find the ones most commonly used in video games.


### Method 2: Cross-fading
Cross-fading is the simplest horizontal re-sequencing technique.  Cross-fading is where  one music cue fades out while another music cue fades up.  This technique is used commonly across all games but include World of Warcraft, and Final Fantasy XIII.

#### Cross-fading Advantages
- Super easy to compose and implement into a game.
- Allows the composer to put more time into writing music, than worry about how it connect in the game.
- Immediate changes to the music based on a game event.
- Ability to completely change the tempo, harmony, instrumentation, or melody instantly based on a game even..

#### Cross-fading Disadvantages
- The least musical of all adaptive techniques
- Musical phrases are often interrupted in the middle of a phrase.
- No accounting for the tempo or key changes when switching from one musical cue to another.

#### Scenarios
Cross-fading is used in all types of games because it’s dead simple to write and implement which saves everyone time.  Sadly though it is the worst in terms of musicality because the music changes can be so abrupt, and noticeable to the player.  Cross-fading is generally a bad method to use if the cues switch more often than 30 seconds because of the constant interruption to the player.  Vertical remixing might be a better choice in that scenario.


### Method 3: Phrase Branching
Phrase branching is another horizontal re-sequencing technique which waits for the current musical phrase to end before playing the next musical cue.  This technique is used in games such as Chime and Killer Instinct.

#### Phrase Branching Advantages
- Most musical of all the horizontal re-sequencing techniques because it will never interrupt a musical phrase.
- Ability to change tempo, harmony, instrumentation or melody in the next phrase based on a game event.

#### Phrase Branching Disadvantages
- Non-immediate musical change because the music change will wait until the end of the current phrase which is dependent on the length of the phrases.
- Can be more disruptive to the player in terms of musical changes than vertical remixing.

#### Scenarios
Phrase branching is better suited for styles/genres which have shorter phrase lengths such as rock and techno.  Longer phrase lengths will delay the entrance of the next music cue.  This technique is extremely musical in terms of never interrupted the current musical phrase, always allowing it to be completed before continuing.  Silence can be embedded in the phrases similar to the stinger-based progression technique below but with specific lengths of silence before continuing.


### Method 4: Musical Demarcation Branching
Musical demarcation branching is a technique which allows the music cue to switch at a musical demarcation point such as a beat, or measure.

#### Musical Demarcation Advantages
- More musical than cross-fading.
- Faster changes than phrase branching.
- Ability to change tempo, harmony, instrumentation or melody in the musical demarcation point based on a game event.

#### Musical Demarcation Disadvantages
- Non-immediate musical change because the music change will wait until the next demarcation point.
- Musical phrases can be interrupted.
- Can be more disruptive to the player in terms of musical changes than vertical remixing.

#### Scenarios
This technique is a hybrid between the non-musicality of switching via cross-fading, and the wait imposed by phrase branching.  The changes are more immediate, and the change will happen on a more musically appropriate place than a random point.  Music games obviously can take the most advantage of this technique, but this technique is used in all types of games because of the advantages.

### Method 5: Bridge Transition
Bridge transitions is another horizontal re-sequencing technique in which short musical cues are used to connect one musical cue with another for more seamless transitions.

#### Bridge Transition Advantages
- Immediate change into the bridge transition phrase.
- Ability to link to disparate music cues in terms of tempo, harmony, and instrumentation.
- Punctuate a conclusion of a musical cue.
- Punctuate the beginning of a musical cue.
- More musical than cross-fading but less musical than phrase branching.
- Ability to change tempo, harmony, instrumentation or melody based on a game event.

#### Bridge Transition Disadvantages
- Musical phrases can be interrupted.
- The length of the bridge transition pushes the beginning of the next cue later making it more difficult to do another change until after the next cue begins.
- Can be more disruptive to the player in terms of musical changes than vertical remixing.
- If the same bridge transition is heard frequently, it can be repetitive to the player.

#### Scenarios
Bridge transitions are a great way to have immediate changes to the music, and help link the transition to the new cue.  Although the transition can interrupt a melodic phrase, the transition can be written in such a way to help mitigate the interruption.  Bridge transitions can be repetitive to the player if the player cycles through the same transition over and over again.  In these cases most composers write multiple transitions for the same cue change for variety.

Bridge transitions are good for punctuating an event within a scene, so if they are used too often, this could be disruptive to the player.  In general if your transitions are happening closer than 30 seconds apart, then a bridge transition solution is probably too disruptive – a technique such as vertical remixing would be a better choice.


### Method 6: Stinger-Based Sequencing
This method of horizontal re-sequencing is a series of stingers which are played back based on game events.  The player triggers these stingers individually based on an event that happens in the game.  These stingers do not connect with one another, but may overlap.  They generally do not have a connecting rhythmic framework, but are composed primarily of crescendos and accents with silence in-between.  This technique is used in games such as Uncharted 4, and Tomb Raider.

#### Stinger-Based Sequencing Advantages
- Stingers are usually separated by silence, so they tend to work well musically together.
- Immediate punctuation of a game event.
- Ability to link to disparate music cues in terms of tempo, harmony, and instrumentation.

#### Stinger-Based Sequencing Disadvantages
- No tempo map or rhythmic framework linking the music together, e.g. can feel like disparate elements.
- Typically non-melodic, or phrases need to be limited to one phrase at a time.
- Can feel close to the film scoring cliche ‘Mickey-Mousing’.
- Phrase lengths are heavily dependent on how the game is dramatically scripted.

#### Scenarios
This technique is great for a heavily scripted game where the player is moving from one event to the next in sequence.  Stinger-based sequencing is not appropriate when you want to supply the player with constant music in the background, or have any type of constant rhythm.  Stingers in this type of scenario tend to play like a rubato piece of music – the player triggers them when they arrive, so there could be a variable amount of time in between each stinger.

## Conclusion
Writing music for games is evolving every day.  Techniques that we’re using today may be eclipsed by tomorrow’s new and inventive tools.  It should be emphasized that the techniques above are not the only techniques available, and they are not exclusive to one another.  Games frequently use multiple techniques at the same time in combinations.  But it’s helpful to understand why you might want to use one technique over another.

In the next generation of music tools for games, such as Elias and Intelligent Music Systems, we’ll see the common adaptive music forms begin to allow for more flexibility. Having an understanding of the fundamental adaptive techniques allows one a great vantage point for evaluating the pros and cons of new techniques offered by these systems.

- [source](https://www.designingmusicnow.com/2016/06/13/advantages-disadvantages-common-interactive-music-techniques-used-video-games/)
- [ref](https://www.gamasutra.com/view/feature/129990/defining_adaptive_music.php)
- [ref](https://snarfed.org/interactive_music)
