<!DOCTYPE html>

<html lang="en">
	<head>
		<title>TileEngine4</title>
		<script type="application/javascript" src="engine.js"></script>
		<script type="application/javascript" src="engine.keyboard.js"></script>
		<script type="application/javascript" src="engine.network.js"></script>
		<script type="application/javascript" src="engine.player.js"></script>
		<script type="application/javascript" src="Timer.js"></script>
		<script type="application/javascript" src="main.js"></script>
		
		<link rel="stylesheet" type="text/css" href="..\layout.css" />
		<style type="text/css">
			canvas#canvas
			{
				border: 1px dotted #888;
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
				<h2>TileEngine4</h2>
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
