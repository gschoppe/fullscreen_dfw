<?php if(!defined('ABSPATH')) { die(); }
/**
 * Plugin Name: Full-Width Distraction Free Writing
 * Plugin URI: http://www.gschoppe.com/fullwidth-dfw
 * Description: Sets the editors DFW mode to 100% width.
 * Version: 1.0.0
 * Author: Gregory Schoppe
 * Author URI: http://gschoppe.com
 * License: GPLv2 or later
 * Text Domain: fullwidth-dfw
 **/

if( !class_exists('FullWidthDFW') ) {
	class FullWidthDFW {
		private static $_this;
		private $plugin_dir;
		private $plugin_dir_url;

		public static function Instance() {
			static $instance = null;
			if ($instance === null) {
				$instance = new self();
			}
			return $instance;
		}

		private function __construct() {
			$this->plugin_dir     = dirname( __FILE__ );
			$this->plugin_dir_url = plugin_dir_url( __FILE__ );
			add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_breakout' ) );
		}
		// your functions go here
		public function enqueue_breakout( $hook ) {
			if ( 'post.php' != $hook ) { return; }
			wp_enqueue_script( 'editor_breakout', $this->plugin_dir_url . '/editor_breakout.js', array( 'jquery' ), 'v1.0.0' );
		}
	}
	FullWidthDFW::Instance();
}