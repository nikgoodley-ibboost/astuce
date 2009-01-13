/*
  The contents of this file are subject to the Mozilla Public License Version
  1.1 (the "License"); you may not use this file except in compliance with
  the License. You may obtain a copy of the License at 
  http://www.mozilla.org/MPL/ 
  
  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  for the specific language governing rights and limitations under the License. 
  
  The Original Code is [ASTUce: ActionScript Test Unit compact edition CLI]. 
  
  The Initial Developer of the Original Code is
  Zwetan Kjukov <zwetan@gmail.com>.
  Portions created by the Initial Developer are Copyright (C) 2006-2009
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
  
*/

package utils
{
    import flash.utils.ByteArray;
    
    public class SWF
    {
        private var _bitPos:int;
        private var _bitBuf:int;
        
        private var _data:ByteArray;
        
        private var _size:SWFRect;
        private var _frameRate:uint;
        private var _frames:uint;
        private var _abc:ByteArray;
        private var _abcName:String;
        
        public function SWF( data:ByteArray )
        {
            _data = data;
            
 ﻿           _size      = _decodeRect();
            _frameRate = ( _data.readUnsignedByte()<<8 | _data.readUnsignedByte() );
            _frames    = _data.readUnsignedShort();
            
            _decodeTags();
        }
        
        public function get size():SWFRect
        {
            return _size;
        }
        
        public function get frameRate():uint
        {
            return _frameRate;
        }
        
        public function get frames():uint
        {
            return _frames;
        }
        
        public function get abc():ByteArray
        {
            return _abc;
        }
        
        public function get abcName():String
        {
            return _abcName;
        }
        
﻿        private function _decodeRect():SWFRect
        {
            _syncBits();
            
            var rect:SWFRect = new SWFRect();
            
            var nBits:int = _readUBits( 5 );
            
            rect.xMin = _readSBits( nBits );
            rect.xMax = _readSBits( nBits );
            rect.yMin = _readSBits( nBits );
            rect.yMax = _readSBits( nBits );
            
            return rect;
        }
        
﻿        private function _decodeTags():void
        {
            var type:int
            var h:int;
            var length:int;
            var offset:int;
            
            while( _data.position < _data.length )
            {
                type = (h = _data.readUnsignedShort()) >> 6;
                
                if( ((length = h & 0x3F) == 0x3F) )
                {
                    length = _data.readInt();
                }
                
                //trace( tagNames[type]+" "+length+"b "+int(100*length/_data.length)+"%");
                
                switch( type )
                {
                    case SWFTags.End.valueOf():
                    return;
                    
                    case SWFTags.DoABC2.valueOf():
                    var pos1:int = _data.position;
                    _data.readInt()
                    _abcName = _readString();
                    length -= (_data.position-pos1);
                    // fall through
                    
                    case SWFTags.DoABC.valueOf():
                    var data2 = new ByteArray();
                    data2.endian = "littleEndian";
                    _data.readBytes( data2, 0, length );
                    _abc = data2;
                    break; 
                    
                    default:
                    _data.position += length;
                }
            }
        }
        
        
﻿        private function _syncBits():void 
        {
            _bitPos = 0;
        }
        
﻿        private function _readString():String
        {
            var s:String = ""
            var c:int;
            
            while( c = _data.readUnsignedByte() )
            {
                s += String.fromCharCode( c );
            }
            
            return s;
        }
        
﻿        private function _readSBits( numBits:int ):int
        {
            if (numBits > 32)
            {
                throw new Error("Number of bits > 32");
            }
            
            var num:int   = _readUBits( numBits );
            var shift:int = 32 - numBits;
            
            // sign extension
            num = (num << shift) >> shift;
            return num;
        }
        
﻿        private function _readUBits( numBits:int ):uint
        {
            if (numBits == 0)
            {
                return 0;
            }
            
            var bitsLeft:int = numBits;
            var result:int   = 0;
            
            if( _bitPos == 0 ) //no value in the buffer - read a byte
            {
                _bitBuf = _data.readUnsignedByte()
                _bitPos = 8;
            }
            
            while( true )
            {
                var shift:int = bitsLeft - _bitPos;
                
                if( shift > 0 )
                {
                    // Consume the entire buffer
                    result   |= _bitBuf << shift;
                    bitsLeft -= _bitPos;
                    
                    // Get the next byte from the input stream
                    _bitBuf = _data.readUnsignedByte();
                    _bitPos = 8;
                }
                else
                {
                    // Consume a portion of the buffer
                    result  |= _bitBuf >> -shift;
                    _bitPos -= bitsLeft;
                    _bitBuf &= 0xff >> (8 - _bitPos); // mask off the consumed bits
                    
                    //if (print) System.out.println("  read"+numBits+" " + result);
                    return result;
                }
            }
            
            return 0;
        }
        
        
    }
}