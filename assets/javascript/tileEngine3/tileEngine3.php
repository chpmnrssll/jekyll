<!DOCTYPE html>

<html lang="en">
	<head>
		<title>TileEngine3</title>
		<script type="application/javascript" src="engine.js"></script>
		<script type="application/javascript" src="engine.animation.js"></script>
		<script type="application/javascript" src="engine.keyboard.js"></script>
		<script type="application/javascript" src="engine.map.js"></script>
		<script type="application/javascript" src="engine.network.js"></script>
		<script type="application/javascript" src="engine.player.js"></script>
		<script type="application/javascript" src="engine.spriteSheet.js"></script>
		<script type="application/javascript" src="engine.tile.js"></script>
		<script type="application/javascript" src="engine.timer.js"></script>
		<script type="application/javascript" src="engine.viewport.js"></script>
		<script type="application/javascript" src="main.js"></script>
		
		<link rel="stylesheet" type="text/css" href="..\layout.css" />
		<style type="text/css">
			canvas#canvas
			{
				border: 1px dotted #888;
			}
			div#chatBox
			{
				position: absolute;
				left: 24px;
				font-family: Arial,Helvetica,sans-serif;
				font-size: 10px;
				color: #FFF;
				background-color: rgba(32,64,128,0.15);
				width: 240px;
				height: 120px;
				overflow-x: hidden;
				overflow-y: hidden;
			}
			input#chatInput
			{
				position: absolute;
				left: 24px;
				top: 190px;
				background: transparent;
				font-family: Arial,Helvetica,sans-serif;
				font-size: 10px;
				color: #FFF;
				border: none;
				width: 240px;
			}
			div#console
			{
				border: 1px dotted #888;
				width: 640px;
				height: 150px;
				overflow-x: hidden;
				overflow-y: auto;
			}
		</style>
	</head>
	
	<body>
		<div class="wrapper">
			<?php include('..\header.html'); ?>
			
			<div id="center" class="column">
				<h2>TileEngine3</h2>
				<div id="chatBox"></div>
				<input type="text" id="chatInput" onkeypress="engine.chat(event, this)"/>
				<canvas id="canvas" width="640" height="480"><p>HTML5 Canvas not supported.</p></canvas>
				<br/>
				<div id="console"></div>
				<br/>
				<p>Insert documentation here.</p>
				<a href="..\code.php">&lt;&lt; Back to Code Experiments</a>
			</div>
			<div id="left" class="column">
				<?php include('..\nav.html'); ?>
			</div>
			<div id="right" class="column">
				&nbsp;
			</div>
			<div id="push"></div>
		</div>
		
		<?php include('..\footer.html'); ?>
	</body>
</html>
