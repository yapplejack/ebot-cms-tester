# Before you get started

* This manual is meant to be used alongside other resources that can be found on our [website](https://www.118everybot.org/)

    * [Bill of Materials](https://docs.google.com/spreadsheets/d/1FQiT3qv4sNFgAs3m7qzWLI2aqMw7r6ssJrI9GN3_Au0/edit?usp=sharing): all of the parts and stock that are needed to construct the Everybot can be found here. This does not include tools that may be required to machine or assemble the Everybot

    * [Cut List](https://docs.google.com/spreadsheets/d/13_pTHQV9YwcAtf3_clEg5P17Wjkwd5Gorz2NcEoRKRs/edit?usp=sharing): a spreadsheet that contains the length that all purchased stock must be cut to. It is recommended to cut and label all stock relevant to a given section before starting

    * [CAD](https://grabcad.com/library/the-2022-robonauts-everybot-2): a comprehensive 3D model of the robot

    * [Robot Code](https://gitlab.com/robonautseverybot/everybot-2023): the Everybot starter code gives the robot the capability to perform all actions showcased in the robot reveal but leaves plenty of room for improvement

    * Part Drawings (coming soon): all part drawings can be found at the top of each mechanism build section but are stored here as well for reference

    * [Discord](https://discord.com/invite/XuWfwRJcfA): join the Everybot community Discord to ask questions, share insight or celebrate achievements

* The immediately following sections of the manual are not instructions, but rather tips and suggested practices for best constructing your robot.

* The three main "Assembly" sections of the manual can be worked on in parallel. That is to say, if the size of your team allows for it, you can build any or all of these sections at the same time. The superstructure should be attached to the chassis before installing the arm and intake, but the actual assembly of each section as well as the chassis can be worked on at the same time.

# The Robonauts’ Everybot Robot Will…

When deciding what this year’s Everybot would be capable of we created an exhaustive list of actions that a Charged Up robot can perform and distilled that list into the Everybot capabilities. Some actions CAN be done by the robot but we will not put resources into having those capabilities as they are byproducts of the design we finished with. Below is the absolute "Robot Will" list.

In the Autonomous Period:

* Score a pre-loaded Cube or Cone

* Score Mobility points

* Dock on and Engage the Charge Station

In the Teleoperated Period:

* Score Cubes in the Bottom, Middle, and High Rows

* Score Cones in the Bottom, Middle, and High Rows

* Acquire Cubes and Cones from the Substations

* Play line-style defense in front of the opponent's loading zone while fully within its frame perimeter

* Dock on and Engage the Charge Station

The design was also driven by the goal of the Everybot being able to advance in the FIRST Robotics Competition, either to the District Championship in a District system or the World Championship in the Regional system. We wanted the intake to be robust and withstand impacts with the scoring and loading areas of the field, and stow safely inside the frame with a game piece when crossing the field. As our prototyping and design work carried on and our absolute "Robot Will" evolved into a physical robot and the Everybot started to take shape, we got a better idea of what match play would look like for the Everybot. 

**Strategy**

The Robonaut’s Everybot has a very straightforward strategy this year. In Autonomous, Everybot will score either preloaded game piece and then will aim to back out of the Community Zone. Teams who make improvements to the starter code can strive for Docking or Engaging the Charge Station in Autonomous.

In the Teleoperated portion of the match the Everybot will spend its time acquiring game pieces from the sliding shelves at the Double Substation and scoring those game pieces in the highest available location unless it makes sense to complete a Link on a lower level. During Qualification matches the Everybot will typically look to Dock or Engage with at least one other partner. During Playoff matches Everybot will continue to cycle game pieces and aim to Engage the Charge Station with both its alliance partners.

# Tools Needed

* Drill

* Clamps

* Rivet gun with nosepiece for 3/16" Rivets

* Metric and Standard Allen Wrench Set

* Open Ended wrench set

* Step Drill Bit

* Hack Saw or Miter Saw

* Speed Square

* Files

* Band Saw (Highly Recommended)

* Drill Press (Highly Recommended)

* 5/32 Drill bit or #20 Drill Bit

* #7 Drill Bit

* #10 Drill Bit

* 1/4"Drill Bit

* 1/2" Drill Bit

* 10-32 Tap

* #25 Chain Break

# The "Cut List"

This manual will cross-reference the [cut list](https://docs.google.com/spreadsheets/d/13_pTHQV9YwcAtf3_clEg5P17Wjkwd5Gorz2NcEoRKRs/edit?usp=sharing) as much as possible when calling for parts. Printing the cut list is highly recommended. To try to make the cut list and our instructions make a little more sense, here is some of the method behind the madness:

* **Stock:** "stock" refers to raw material - it is the different “stuff” you are building the robot out of, like box tubing (of different dimensions), wood, or threaded rod. Each type of stock is color coded.

* **Part [.prt]:** this is the name of the individual CAD computer file with the 3D model and information for this specific part of the robot.

* **Quantity:** how many copies of this Part or "cut" you will need to make.

* **Length [in]:** the length, in inches, of the material that this Part uses. For most types of stock the dimensions of the stock make it obvious which direction this measurement is for - it would be hard to cut either the one or two inch dimensions of 2" x 1" 1/16" Wall Tubing to be 48.62 inches long, for example.

* **Width [in]: **what width to cut something to if appropriate, typically should only be used for polycarbonate sheets.

* **Note: **for your own usage.

* **Purpose:** which major component of the robot this piece is for. 

* **Total used [in]:** These measurements may help you lay out your cuts, but may also be a little confusing - don’t worry about them too much. If you make your cuts with the Quantity, Length [in], and Stick of each Part in mind they will work out.

* **Which stock to cut from (Sticks):** also referred to as "sticks," these are individual pieces of Stock with particular cuts in them. Use these to plan out your cuts on your raw Stock. Stick numbers restart with every new Stock - Stick 1 of the 1” by 1” 1/16th Wall Tubing is a different piece from Stick 1 of the 2" x 1" 1/16" Wall Tubing. The different lengths of each stock also have different stick numbers. We will use the part names to refer to pieces rather than stick numbers, as they are only really useful when first cutting the pieces out.

You should clearly label machined parts in a way that makes sense to your team. We recommend writing at least the Part names from the cut list, as that will make it obvious what part to grab when this manual refers to, for example, 02_Superstructure_Upright. Here are some examples of how you may want to label your parts from last year’s Everybot.

# Precision Machining Tips

Some components of the Everybot will require more precise manufacturing practices. Here are some tools and tips to getting more accurate parts in a modest shop:

* **Square:** A combination square can be used to easily mark lines to cut perpendicular to the edge of a piece of material. The metal "handle" slides along a ruler and can be tightened in place and provide a perpendicular edge to mark along. A “scribe” for scratching cut lines is also commonly screwed into the handle. A “speed” square or carpenter’s square can help to make sure two components are at perfect 90 degree angles to one another.

* **Punch:** To help make accurate holes, consider marking where you need to drill with a center punch, which will leave a small indentation that you can line a drill bit up with. Automatic punches are available which do not need to be struck to make an indentation. Always drill your holes as straight as possible and on a drill press when making critical holes.

* **Calipers: **Calipers are sort of a very accurate ruler or tape measure - but only for shorter parts. They read the distance between the two "teeth" - if you are trying to mark a hole 4.25 inches inwards from the edge of a part, slowly slide the display section along the ruler until it reads 4.25. Then place one of the teeth against the edge of your part, and the other will measure to the point 4.25 inches in from there. Use the teeth of the calipers to make a straight scratch in the metal, then change the distance to the 2nd dimension for the desired location and make a 2nd scratch. The center of the cross will be much more accurate than marking the location with a Sharpie, especially if you use a punch right where the marks cross before drilling.

* **Drill vs Drill Press: **Although the Everybot can be built with just a drill, many parts will appreciate a high degree of precision, and holes will turn out straighter and more accurately located if drilled out on a drill press. When using a drill press it is still important to use a punch as the drill bit can still wander when beginning a hole. Make sure your piece is clamped firmly and that the drill bit is lined up to come down directly at the mark from your punch. Hand drills are great when making holes that do not need to be in an exact location, like the holes drilled through gussets to rivet something together. This technique of clamping a smaller component of the robot like a gusset or mounting plate to a piece of box tube and then drilling through the existing holes in the gusset or mounting plate and into the box tube behind it to make sure that holes line up is used often in constructing the Everybot.

# Reading Part Drawings

This manual uses engineering "drawings" like the one below to aid you in machining parts of the Everybot correctly. This part is from the 2022 Everybot but we will use it as an example.

The name of the piece you are looking at is in the bottom right corner. For the purposes of this manual, all dimensions on all drawings are in inches. 

Each line with arrows and a number through it or next to it are a type of dimension. The arrows point towards lines which extend to the points on the part that the measurement is taken between - that is to say, if you took a tape measure and lined the beginning of it up with where one of the lines points on your physical part, and then extended it to where the other line points, the tape measure should read the number located between the two arrows on the drawing. 

The bottom most marking of 11.00 in the blue box gives the dimension for the entire piece. For this part in particular both ends were rounded, making this a particularly confusing part to "read." Most drawings will reference all measurements from a single edge of the part.

The drawing shows that the arm link will have two holes. Dimensions referencing the location of holes are measured to the center of the hole - this allows you to scribe (see the [Precision Machining Tips](#heading=h.2thgfedhynth) section if you do not know what this means!) the center of the hole and center punch (ditto!) it to mark where to drill. One hole is centered 1.00 inch from the reference edge (the red box), and the other will be 10.00 inches from the reference edge (green box). These two dimensions also tell you several other things not in the drawing - for example, the centers of the two holes are also 9.00 inches apart from each other.

Both of the pink boxes tell you that the center of each hole is .50 inches away from the edge of the bar. Because this link is cut from 1 inch by 1 inch tube stock, you know that these holes are centered across one of the 1 inch faces - if you mark 0.5 inches from one side of the bar, and then measure from your mark to the other side, it should also be 0.5 inches from that side. Not all holes are centered in this way.

The last dimension on this sheet is the diameter of the hole in the orange box. This is also the size of the drill bit you will want to drill that hole with. "THRU" means that it goes all the way through the box tube. Holes without “THRU” only go through a single side of the box tube.

Technical drawings are complicated and can be hard to understand initially. We suggest trying to go through each drawing slowly and mark the parts you understand down onto your physical pieces as you go. **Don’t forget to double check your work before you cut and drill!**




<img src={require("/static/media/before-you-get-started/before/image_0.png").default} width = "990" height = "233.75" />


<img src={require("/static/media/before-you-get-started/before/image_1.jpg").default} width = "855.25" height = "156.75" />


<img src={require("/static/media/before-you-get-started/before/image_2.jpg").default} width = "446.875" height = "151.25" />


<img src={require("/static/media/before-you-get-started/before/image_3.jpg").default} width = "203.5" height = "203.5" left="594" />


<img src={require("/static/media/before-you-get-started/before/image_4.jpg").default} width = "160.875" height = "105.875" left="0" />


<img src={require("/static/media/before-you-get-started/before/image_5.jpg").default} width = "325.875" height = "253" left="508.40625" />


<img src={require("/static/media/before-you-get-started/before/image_6.png").default} width = "805.75" height = "617.375" />


<img src={require("/static/media/before-you-get-started/before/image_7.jpg").default} width = "539" height = "332.75" left="334.125" />


<img src={require("/static/media/before-you-get-started/before/image_8.jpg").default} width = "0" height = "0" />


