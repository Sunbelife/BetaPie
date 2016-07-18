<?php
	class Imagecode{
		private $width ;
		private $height;
		private $counts;
		private $distrubcode;
		private $fonturl;
		private $session;
    /*随机数字和字母*/
		function __construct($width = 120,$height = 30,$counts = 4,$distrubcode="1235467890abcdefghijkmnopqrstuvwxyz",$fonturl="./fonts/Tekton.otf"){
			$this->width=$width;
			$this->height=$height;
			$this->counts=$counts;
			$this->distrubcode=$distrubcode;
			$this->fonturl=$fonturl;
			$this->session=$this->sessioncode();
			session_start();
			$_SESSION['code']=$this->session;/*设置session名字为code*/
		}

		 function imageout(){
			$im=$this->createimagesource();
			$this->setbackgroundcolor($im);
			$this->set_code($im);
			$this->setdistrubecode($im);
			ImageGIF($im);
			ImageDestroy($im);
		}
/*创建图片*/
		private function createimagesource(){
			return imagecreate($this->width,$this->height);
		}
/*设置图片背景*/
		private function setbackgroundcolor($im){
			$bgcolor = ImageColorAllocate($im, rand(200,255),rand(200,255),rand(200,255));
			imagefill($im,0,0,$bgcolor);
		}
		/*加入干扰元素*/
		private function setdistrubecode($im){
			$count_h=$this->height;
			$cou=floor($count_h*2);
			for($i=0;$i<$cou;$i++){
				$x=rand(0,$this->width);
				$y=rand(0,$this->height);
				$jiaodu=rand(0,360);
				$fontsize=rand(8,8);
				$fonturl=$this->fonturl;
				$originalcode = $this->distrubcode;
				$countdistrub = strlen($originalcode);
				$dscode = $originalcode[rand(0,$countdistrub-1)];
				$color = ImageColorAllocate($im, rand(40,140),rand(40,140),rand(40,140));
				imagettftext($im,$fontsize,$jiaodu,$x,$y,$color,$fonturl,$dscode);

			}
		}
		/*输出验证码*/
		private function set_code($im){
				$width=$this->width;
				$counts=$this->counts;
				$height=$this->height;
				$scode=$this->session;
				$y=floor($height/2)+floor($height/4);
				$fontsize=rand(30,35);
				$fonturl="./fonts/Tekton.otf";//$this->fonturl;
				$counts=$this->counts;
				for($i=0;$i<$counts;$i++){
					$char=$scode[$i];
					$x=floor($width/$counts)*$i+8;
					$jiaodu=rand(-20,30);
					$color = ImageColorAllocate($im,rand(0,50),rand(50,100),rand(100,140));
					imagettftext($im,$fontsize,$jiaodu,$x,$y,$color,$fonturl,$char);
				}



		}
		/*将验证码存入session*/
		private function sessioncode(){
				$originalcode = $this->distrubcode;
				$countdistrub = strlen($originalcode);
				$_dscode = "";
				$counts=$this->counts;
				for($j=0;$j<$counts;$j++){
					$dscode = $originalcode[rand(0,$countdistrub-1)];
					$_dscode.=$dscode;
				}
				return $_dscode;

		}
	}
	/*令图片格式为gif*/
	Header("Content-type: image/GIF");
	$imagecode=new  Imagecode(160,50);
	$imagecode->imageout();
?>
