# @asmtechno/draw-flow-building-blocks
DFBB(Draw-Flow-Building-Blocks) is environment for JavaScript. The flow-based programs is an open-source, flow-based development tool that simplifies the creation of IoT applications by providing a visual programming interface. Developed by IBM Emerging Technology and OpenJS Foundation Draw-Flow-Building-Blocks has gained widespread adoption due to its ease of use and flexibility. At its core, Draw-Flow-Building-Blocks enables users to wire together devices, APIs, and online services seamlessly and intuitively.
The Building Blocks: Nodes, Flows, and Messages.
Draw-Flow-Building-Blocks revolves around three fundamental concepts: Nodes, Flows, and Messages.
### Nodes: 
These are the functional building blocks of Draw-Flow-Building-Blocks, representing various operations or devices. Each node is designed to perform a specific task, from input and output operations to data manipulation and external integrations.
### Flows: 
A Flow is a sequence of connected nodes, forming the structure of your application. It represents the logical workflow of your IoT solution and serves as the canvas where you bring your ideas to life.
### Messages: 
In Draw-Flow-Building-Blocks, communication between nodes occurs through messages. A message typically consists of a payload, topic, and optional properties, allowing seamless data exchange between nodes within a flow.
Scripting Power with Function Nodes
While Draw-Flow-Building-Blocks emphasizes visual programming, there are situations where more intricate logic or customization is required. Enter the Function Node, a versatile component that enables developers to inject JavaScript code directly into their flows, offering limitless possibilities for data manipulation and processing.
Debugging and Deployment Strategies
Every developer's journey involves debugging and deploying their applications. Discover tips and tricks for effective debugging using the Debug sidebar, console output, and flow control mechanisms. Learn how to deploy changes efficiently, with options for both incremental and full deployments.
Extending Draw-Flow-Building-Blocks: External Integrations and Dashboards
Draw-Flow-Building-Block's capabilities extend beyond the built-in nodes. Explore how to integrate external services through HTTP requests, connect to MQTT brokers, and interact with databases. Uncover the potential of creating custom dashboards using UI nodes, allowing you to present your data more user-friendly and visually appealing.
Here's a basic cheat sheet to help you get started:
Draw-Flow-Building-Blocks Cheat Sheet
Nodes:
Inject Node: Generates a trigger event at a specified interval.
Debug Node: Outputs messages to the debug sidebar.
Function Node: Allows you to write JavaScript code to manipulate messages.
Switch Node: Routes messages based on specified conditions.
Change Node: Modifies message properties.
HTTP In Node: Creates an HTTP endpoint for receiving requests.
HTTP Response Node: Sends an HTTP response.
Template Node: Allows you to create HTML or other templates.
MQTT In/Out Nodes: Connects to an MQTT broker for message communication.
Database Nodes: Various nodes interact with databases like MongoDB, MySQL, etc.
File Nodes: Read or write files on the filesystem.
Flows:
Flow: A sequence of connected nodes representing a program or process.
Subflow: A reusable flow that can be embedded within other flows.
Messages:
msg.payload: The main data of a message.
msg.topic: A label for the message payload.
msg.status: Represents the status of the message.
msg.error: Contains an error object if an error occurred.
Functions (JavaScript):
msg.payload = ...; Set the payload of the message.
return msg; Send the modified message to the next node.
Debugging:
Debug Sidebar: Use the debug node to output messages to the debug sidebar for debugging.
Console Output: Print messages to the Draw-Flow-Building-Blocks console using node.warn('Your message') in a function node.
Flow Control:
Link Nodes: Connect multiple flows using link nodes.
Switch Node: Route messages based on conditions.
Deploying:
Deploy Button: Apply changes and deploy the current flow.
Full Deploy: Deploy all changes in the workspace.
External Integrations:
HTTP Request Node: Send HTTP requests to external services.
MQTT Nodes: Connect to external MQTT brokers.
Database Nodes: Interact with external databases.
Dashboard:
ui_template Node: Create custom UI components.
ui_chart Node: Display data in a chart format.
ui_button Node: Create clickable buttons.
