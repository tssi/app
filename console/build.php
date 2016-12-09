<?php
	define('DS',DIRECTORY_SEPARATOR);
	$path = dirname(__FILE__).DS.'config.json';
	$config = json_decode(file_get_contents($path),true);
	$path = dirname(dirname(__FILE__)).DS;
	foreach($config['files'] as $file){
		if(file_exists($file))
			unlink($file);
	}
	function recurseRmdir($dir) {
	  $files = array_diff(scandir($dir), array('.','..'));
	  foreach ($files as $file) {
		(is_dir("$dir/$file")) ? recurseRmdir("$dir/$file") : unlink("$dir/$file");
	  }
	  return rmdir($dir);
	}
	foreach($config['folders'] as $folder){
		if(file_exists($folder))
			recurseRmdir($folder);
		mkdir($folder);
		
		
	}
	
	foreach($config['files'] as $file){
		if(file_exists($path.$file))
			copy($path.$file,$file);
	}
	foreach($config['findreplace'] as $file=>$action){
		$content = file_get_contents($file);
		foreach($action['find'] as $i=>$key){
			$content = str_replace($key,$action['replace'][$i],$content);
			file_put_contents($file,$content);
		}
		
	}
	$index = dirname(dirname(__FILE__));
	$html = file_get_contents($index.DS.'index.html');
	$dom = new DOMDocument('1.0', 'UTF-8');                         // init new DOMDocument
	$internalErrors = libxml_use_internal_errors(true);
	$dom->preserveWhiteSpace=false;
	$dom->loadHTML($html);                           // load HTML into it
	$dom->formatOutput =true;
	libxml_use_internal_errors($internalErrors);
	$xpath = new DOMXPath($dom);                     // create a new XPath
	$nodes = $xpath->query('//ul[@class="sidebar-nav"]/li/ul/li'); // Find all UL with class
	foreach($nodes as $node) {                       // Iterate over found elements
		//	var_dump($node);
		$node->parentNode->removeChild($node);       // Remove UL Element
	}
	$ul = $xpath->query('//ul[@class="sidebar-nav"]/li/ul')[0];
	$fragment = $dom->createDocumentFragment();
	$fragment->appendXml('<li><a href="#/">Link</a></li>');
	$ul->appendChild($fragment);
	$index = dirname($index);
	file_put_contents($index.DS.'index.html',$dom->saveHTML());   
?>