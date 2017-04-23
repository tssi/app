<?php
	define('DS',DIRECTORY_SEPARATOR);
	$path = dirname(__FILE__).DS.'config.json';
	$config = json_decode(file_get_contents($path),true);
	$path = dirname(dirname(__FILE__)).DS;
	$cleanStarted = false;
	$delay =150000;
	echo "Build app started \n";
	usleep($delay);
	foreach($config['files'] as $file){
		$performClean = false;
		if(file_exists($file)){
			unlink($file);
			$performClean = true;
			usleep($delay);
		}
		if($performClean&&!$cleanStarted){
			echo "Cleaning files... \n"; 
			$cleanStarted=true;
		}
		if($performClean){
			echo "\t$file\n";
		}
	}
	
	function recurseRmdir($dir) {
	  $files = array_diff(scandir($dir), array('.','..'));
	  foreach ($files as $file) {
		(is_dir("$dir/$file")) ? recurseRmdir("$dir/$file") : unlink("$dir/$file");
	  }
	  return rmdir($dir);
	}
	echo "Initializing directories... \n"; 
	usleep($delay);
	foreach($config['folders'] as $folder){
		if(file_exists($folder))
			recurseRmdir($folder);
		mkdir($folder);
		echo "\t$folder\n";
		usleep($delay);
		
	}
	echo "Copying files...\n"; 
	usleep($delay);
	foreach($config['files'] as $file){
		if(file_exists($path.$file))
			copy($path.$file,$file);
		echo "\t..$file > $file\n";
		usleep($delay);
	}
	echo "Sanitizing index.html...\n";
	usleep($delay);
	$index = dirname(dirname(__FILE__));
	$html = file_get_contents($index.DS.'index.html');
	$dom = new DOMDocument('1.0', 'UTF-8');                         // init new DOMDocument
	$internalErrors = libxml_use_internal_errors(true);
	$dom->preserveWhiteSpace=false;
	$dom->loadHTML($html);                           // load HTML into it
	$dom->formatOutput =true;
	libxml_use_internal_errors($internalErrors);
	echo "\tResetting sidebar menu...\n"; 
	$xpath = new DOMXPath($dom);                     // create a new XPath
	$nodes = $xpath->query('//ul[@class="sidebar-nav"]/li/ul/li'); // Find all UL with class
	foreach($nodes as $node) {                       // Iterate over found elements
		//	var_dump($node);
		$node->parentNode->removeChild($node);       // Remove UL Element
	}
	$ul = $xpath->query('//ul[@class="sidebar-nav"]/li/ul')[0];
	$fragment = $dom->createDocumentFragment();
	$fragment->appendXml('<li><a href="#/logout">Logout</a></li>');
	$ul->appendChild($fragment);
	$index = dirname($index);
	file_put_contents($index.DS.'index.html',$dom->saveHTML());   
	
	echo "\tUpdating paths...\n"; 
	usleep($delay);
	foreach($config['findreplace'] as $file=>$action){
		$content = file_get_contents($file);
		echo "\t\tReplacing $file\n";
		usleep($delay);
		foreach($action['find'] as $i=>$key){
			$replacement = $action['replace'][$i];
			$content = str_replace($key,$replacement,$content);
			$f = file_put_contents($file,$content);
			echo "\t\t\t $f $key > $replacement \n";
		}
	}
	echo "Build app finished";
?>