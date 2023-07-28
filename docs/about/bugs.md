Bugs: 

After an inline image, you can have a positioned image bound to paragraph that only consists of the image followed by a page break, functionally making the element unreachable.

Investigate how Google converts ol and ul to HTML, there may be issues with indentation or different bullet point styles that break them up into multiple parts (may not be an issue).

Style:

Do not hyperlink images. (this is fixable by changing the import processing of a elements)

//Notes on LocalCrop.css in relation to google doc importing
//96 px = 1 inch in google docs, doc is 8.5" long so google doc length is 816 px and images from default margin to margin is 720px
//images will be imported larger
//currently the docs pages are 990pxs meaning images can be upscaled by 1.375
// 958 is current size of unmodified doc column, so from 531 to 958 is a resize of 1.8 however the html size is not refecltive of the size in google docs
// we are using 1.35 as the conversion factor rn but we should do the math and not be lazy

//structure: doStuff, readInput, writeOutput, low level implement


//Revalations: currently our md export is not putting images in the correct locations or order. HMTL appears to always have the image in the ideal location. Text must be read in from HMTL to ensure correct image locations.
//MD must be rewritten to always have images in correct order as we still need to know the float location from the images.

//New style will be as follows: each line of HMTL is its own line in markdown, therefore we will basically be covnerting from markdown to HMTL, this will make debugging easier as the program will better reflect the file generated


//Current bugs: lists, images are too big, positioned images are pain, fucked margins when there are rotations

//Where to find bugs:
//lists: required tools
//margins: Wheel Assembly, specifically happens with rotated images
//must add space in the header when deleting images
//page breaks will break things, test superstructure machining vs gearbox-assembly for chassis
//need to be able to deal with raw spans






<ol><li>Cut all tube stock and hex shaft to proper length. The cuts marked as for the Superstructure in the <span style={{ textDecoration: "underline"}}><a class="c10" href="https://www.google.com/url?q=https://docs.google.com/spreadsheets/d/13_pTHQV9YwcAtf3_clEg5P17Wjkwd5Gorz2NcEoRKRs/edit?usp%3Dsharing&amp;sa=D&amp;source=editors&amp;ust=1690317349750040&amp;usg=AOvVaw2qzcDyuFt81Gaqu9CZxA_5">cut list</a></span>&nbsp;will be used.</li><li>Drill out the chassis attachment holes in <span style={{ backgroundColor: "#c9daf8"}}>02_Superstructure_Upright</span>.</li><li>Bolt some smaller components to <span style={{ backgroundColor: "#c9daf8"}}>02_Superstructure_Mainbeam</span>&nbsp;to help correctly locate several of the holes. Cut the angle into the bottom corner.</li><li>Drill out the chassis attachment holes in <span style={{ backgroundColor: "#d9ead3"}}>02_Superstructure_Support</span>&nbsp;and add the angle.</li><li>Gusset and rivet <span style={{ backgroundColor: "#c9daf8"}}>02_Superstructure_Upright</span>&nbsp;to <span style={{ backgroundColor: "#c9daf8"}}>02_Superstructure_Mainbeam</span>.</li><li>Add crossbeams between the two sides of the superstructure.</li><li>Mount the superstructure to the chassis.</li><li>Correctly position the <span style={{ backgroundColor: "#c9daf8"}}>02_Superstructure_Mainbeam</span>&nbsp;and rivet the <span style={{ backgroundColor: "#d9ead3"}}>02_Superstructure_Support</span>&nbsp;to <span style={{ backgroundColor: "#c9daf8"}}>02_Superstructure_Mainbeam</span>&nbsp;to hold it in place.</li><li>Add the battery bracket and additional crossbracing.</li><li>Assemble the MAX Planetary gearbox and insert the <span style={{ backgroundColor: "#ea9999"}}>02_Superstructure_Jackshaft</span>&nbsp;through the gearbox and lower bearing holes in <span style={{ backgroundColor: "#c9daf8"}}>02_Superstructure_Upright</span>.</li><li>Add Clamping Bearing Blocks to the upper bearing holes in <span style={{ backgroundColor: "#c9daf8"}}>02_Superstructure_Upright</span>.</li></ol>

If at any point you are unsure of what a direction or diagram is telling you to do, please ask for clarification in the Everybot <span style={{ textDecoration: "underline"}}><a class="c10" href="https://www.google.com/url?q=https://discord.gg/XuWfwRJcfA&amp;sa=D&amp;source=editors&amp;ust=1690317349752138&amp;usg=AOvVaw2V8DUtIs1zz_memQZKv4dn">Discord</a></span>! This is the fastest way to get an answer from the Everybot team, and questions we see there will help us to revise this manual to make steps more clear for other Everybot builds.<div style={{pageBreakAfter: 'always'}}></div>

The holes in the upright can be made in one of two ways. They could simply be dimensioned out using calipers to mark the offset from the side rail and bottom, then center punched and drilled out. Alternatively, they can be placed in the chassis, clamped down, and drilled out. The <span style={{ backgroundColor: "#c9daf8"}}>02_Superstructure_Upright</span>s are not meant to be flush to the chassis back plate, there is a 1/8&rdquo; gap between them. To fix that, put a piece of chassis cutoff between the back of the chassis and the <span style={{ backgroundColor: "#c9daf8"}}>02_Superstructure_Upright</span>. Then clamp the <span style={{ backgroundColor: "#c9daf8"}}>02_Superstructure_Upright</span>&nbsp;in place, use a speed square to make sure the upright is perpendicular to the frame, and drill out the 1/4&rdquo; hole. Pictures of this method are shown below. These holes are drilled all the way through <span style={{ backgroundColor: "#c9daf8"}}>02_Superstructure_Upright</span>."

<ul><li>Qty(2) x <span style={{ backgroundColor: "#c9daf8"}}>02_Superstructure_Upright</span></li><li>Qty(2) x <span style={{ backgroundColor: "#c9daf8"}}>02_Superstructure_Main_Beam</span></li><li>Qty(2) x <span style={{ backgroundColor: "#d9ead3"}}>02_Superstructure_Support</span></li><li>Qty(1) x <span style={{ backgroundColor: "#d9ead3"}}>02_Superstructure_Top_Crossbeam</span></li><li>Qty(1) x <span style={{ backgroundColor: "#d9ead3"}}>02_Superstructure_Mid_Crossbeam</span></li><li>Qty(1) x <span style={{ backgroundColor: "#ea9999"}}>02_Superstructure_Jackshaft</span></li><li>Qty(4) x 150 Degree Gussets</li><li>Qty(4) x 120 Degree Gussets</li><li>Qty(6) x 90 Degree Gussets</li><li>Qty(2) x T Gussets</li><li>Qty(6) x 1/4-20 1/2&rdquo; bolts</li><li>Qty(6) x 1/4-20 locknuts</li><li>3/16 rivets</li></ul>