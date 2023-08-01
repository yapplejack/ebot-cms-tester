---
sidebar_label: 'Why'
sidebar_position: 1
header-includes:
  - \pagenumbering{gobble}
---

# Welcome

## What is this?

This is a website is uses a markdown-folder-structure based react app called Docusaurus. More importantly this is attempt at improving the documentation for the Everybot and creating a home for additional FRC resources.

<hr/>

### What is here right now?

Currently I have converted some of the manual into markdown in the docs section. All of the sections print nearly identically to a Google Doc and a majority of desired styling from the doc is also present. 

<p> <br /> </p>

Additionally there is some scaffolding for a fundamentals of FRC section, meant to exist as a wiki for low resource robotics. 

<p> <br /> </p>

There is also a updates section that could be used to let people know when there are stock issues, changes or additions to manual.

<p> <br /> </p>

Lastly there is an algorithm that is able to process takes the output of my script and HTML from a Google Doc and converts it into a markdown file.

<hr/>

### Why make a website?

After my time working on both the documentation and build videos I was disappointed by disunity between them. I want the resources to benefit symbiotically from each other. The manual needs videos because skills like measuring and machining can be difficult to explain in text and any holes left by limitations of the instructions can be filled by videos. It then follows that videos are at their best if they are integrated into the manual, as they need the organization it provides. <p> <br /> </p>

I have looked into alternatives to Google Docs, specifically GitBook, which both REV and WCP use but I found it lacking. You have to pay to allow your docs to be printed (and they do not look good when converted to PDF), their Google Doc conversion is worse than mine and they lack a lot of customization. <p> <br /> </p>

The main goal that I set out with was for each section to allow for embedded videos for better manual to video cohesion.

<details >
    <summary>
        Build Video for Section
    </summary>
    <div>
    <iframe width="420" height="315"
        src="https://www.youtube.com/embed/def5QH7UUIU">
    </iframe>
    </div>
</details>

Notable these videos do not sacrifice printing as they hide themselves when using ctrl + p.<p> <br /> </p>

In addition to section specific videos it would be nice to have prerecorded videos called "skill videos" (temp name) that could be used to bolster a section and cut down on required in-season filming. These videos are what I would like to make for the fundamentals of FRC.

<details >
    <summary>
        Skill videos could include:
    </summary>
    <div>
        <ul>
            <li>Reading Engineering Drawings</li>
            <li>Using specific machines</li>
            <li>Dimensioning/marking and so on</li>
            <li>Basically anything from the fundamentals</li>
        </ul>
    </div>
</details>

The concept of what a page of the manual would look like with a section video can be seen [here](../manual/chassis/gearbox-assembly.md), please try to print it if you desire.

<hr/>

### Google Docs is not amazing for 150 page manuals

Google Docs had a lot of trouble loading the 397 images we used on less beefy computers.

Additionally navigation is not great with G-Docs, we definitely could have done better with our heading usage however on lesser machines there is still a massive load when skipping around.

With the pages being broken up as they are, users should have to load a max of 50 images.

<hr/>

### The Big Question: Should We Use It?

Maybe, I am not sure yet. It has the potential to look significantly better than a Google Doc but it can also easily look worse if care is not taken. It is based on the same type of file as GitBooks (markdown files) but it allows for the usage of Javascript and is built with react which allows for infinite customization. <p> <br /> </p>

Right now the biggest hurdles are installation, collaboration and infrastructure. There are some major disadvantages but I plan on going more in depth on these issues later on as they are constantly evolving. 

Videos and documentation should benefit from each-other and I believe this might be the best way to achieve that. That being said, a Google Doc like format might not be the best for an instruction manaul. 

<div>
    <ul>
        <li>Should instructions have steps?</li>
        <li>Do pages have a purpose?</li>
        <li>Will it be too much work in-season? Can we teach students to help with it? (yes)</li>
    </ul>
</div>

Anyway here is what the vendor's documentation looks like: 

[REV Starter Bot](https://docs.revrobotics.com/frc-kickoff-concepts/charged-up-2023/starter-bot-2023-rev-ion-frc/2023-rev-ion-frc-starter-bot-build-guide): Half of the images will not load, not sure if that is a me problem. They use GitBook. 

[WCP](https://docs.wcproducts.com/wcp-single-stage-gearbox/): GitBooks users.

[Thrifty](https://drive.google.com/drive/folders/1J4WqhSLfIULLtzq9aZi6ZGNaLbMHUs0I): Super clean PDF that focuses on inline images.

[AM](https://cdn.andymark.com/media/W1siZiIsIjIwMjMvMDEvMjYvMTEvNTEvNTYvOTMzZjk2M2YtNGM3ZS00ZDJkLWIwNmUtOGMxYjQ0Y2M2ZjViL1dDREMgQXNzZW1ibHkgR3VpZGUgdjEuMjYuMjMucGRmIl1d/WCDC%20Assembly%20Guide%20v1.26.23.pdf?sha=5ab842de7f106a9b): Blocked instructions in PDF form.

Although our 2023 google doc does not look amazing, I am happy with the level of detail we provide. I do think it could benefit from more organization but I am not entirely sure what the best approach is. Should I continue down the Google Doc approach or is there a better way?

<hr/>

### How do you use it?

Currently you create a Google Doc containing the page info, feed it to website using the /crop extension and then clean up the spacing on the result.

This process can be cleaned up but after setting up your environment you can create pages by doing the following: 

<div>
    <ul>
        <li>Make sure the Google Doc is formatted correctly: make sure images are not positioned if possible especially if contained in the same paragraph and any positioned images are fixed to text</li>
        <li>Run the script I will provide and download the G-Doc as a web page</li>
        <li>Feed the results into /ebot/crop extension, you will receive a zipped file that contains all the images and some console output that will be your markdown file</li>
        <li>Create folders for the images and markdown file, then cleanup the spacing in the markdown file</li>
    </ul>
</div>

The conversion from G-Docs to Word Docs is not 100% clean so there will be some minor issues to cleanup however most issues should be easy to take care of.

In theory it should be easy to process an entire section like Superstructure and have the program produce a zip file that can be dragged into the project folder to heavily cut down on the number of google docs used.

You can also just write raw markdown but writing markdown from scratch is a completely different task than editing it. 

<hr/>

### How is it hosted?

Currently this running on Github Pages via the gh-pages branch in my repository for it, with the project being saved to the main branch. The website can easily be hosted for free through a variety of providers however Github pages should be good enough. GitHub pages sites may not exceed 1GB, this site is currently ~55MBs. The other issue would be the 100GB rate limit but I highly doubt this would be broken. 