<!DOCTYPE html>
<html><head>
<meta charset="utf-8"><meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>dtinth's HTML Stuff!</title>
<link rel="stylesheet" href="css.css">
<link rel="stylesheet" href="home.css">
</head><body class="dark">

<h1>my html stuff</h1>
<div class="content-pad center">
	<p>I'll put links to my HTML projects here.</p><?php

$list = array(
	'crew-standings' => '',
	'crew-to-play' => 'http://blog.dt.in.th/2011/02/crew-to-play/',
	'reminder' => '',
	'scenesetter' => '',
	'friendlist' => '',
	'gps' => 'http://blog.dt.in.th/2011/04/gps/',
);

echo '
	<table>';

foreach ($list as $k => $v) {
	echo '
		<tr>
			<th><a href="' . $k . '/">' . $k . '</a></th>
			<td><a href="https://github.com/dtinth/' . $k . '">repo</a></td>';
	
	if (!empty($v)) {
		echo '
			<td><a href="' . $v . '">blog</a></td>';
	}

	echo '
		</tr>';
}

echo '
	</table>
';

?></div>
<div class="footer">
	<p>for more details: <b><a href="https://github.com/dtinth">github.com/dtinth</a></b></p>
</div>

</body></html>
