function trigger(){
    console.log("Touched");
    var fileInput = document.getElementById("fileInput");
    var files = fileInput.files;
    var accept = {
      binary : ["image/png", "image/jpeg"],
      text   : ["text/plain", "text/css", "application/xml", "text/html"]
    };
    var file;
    var data
    for (var i = 0; i < files.length; i++) {
      file = files[i];

      // if file type could be detected
      if (file !== null) {
        if (accept.binary.indexOf(file.type) > -1) {
          // file is a binary, which we accept
          data = file.getAsBinary();
        } else if (accept.text.indexOf(file.type) > -1) {
          // file is of type text, which we accept
          data = file.getAsText();
          console.log("Warning: file is a text file not an image file. Hence used getAsText() instead of getAsBinary")
          // modify data with string methods
        }
        else{
            console.log("File not read");
        }
      }
    }
    console.log(data);
}


var data = "abc";
var myFile = new Blob([data], {type: "text/plain"} );
console.log(myFile);

var reader = new FileReader();

reader.onload = function(e) {
  var rawData = reader.result;
  
}

reader.readAsBinaryString(myFile);


/* Generated from Java with JSweet 2.2.0-SNAPSHOT - http://www.jsweet.org */
/**
 * Construct a bit-at-a-time input stream from a file whose
 * name is supplied.
 * @param {string} filename is the name of the file that will be read.
 * @throws RuntimeException if filename cannot be opened.
 * @class
 * @extends { str: string, cursor: number }
 * @author Owen Astrachan
 */
var BitInputStream = (function () {
    function BitInputStream(filename) {
        var _this = this;
        if (((typeof filename === 'string') || filename === null)) {
            var __args = arguments;
            if (this.myInput === undefined)
                this.myInput = null;
            if (this.myBitCount === undefined)
                this.myBitCount = 0;
            if (this.myBuffer === undefined)
                this.myBuffer = 0;
            if (this.myInput === undefined)
                this.myInput = null;
            if (this.myBitCount === undefined)
                this.myBitCount = 0;
            if (this.myBuffer === undefined)
                this.myBuffer = 0;
        }
        else if (((filename != null && (filename instanceof Object)) || filename === null)) {
            var __args = arguments;
            var __in_1 = __args[0];
            if (this.myInput === undefined)
                this.myInput = null;
            if (this.myBitCount === undefined)
                this.myBitCount = 0;
            if (this.myBuffer === undefined)
                this.myBuffer = 0;
            if (this.myInput === undefined)
                this.myInput = null;
            if (this.myBitCount === undefined)
                this.myBitCount = 0;
            if (this.myBuffer === undefined)
                this.myBuffer = 0;
            (function () {
                _this.myInput = __in_1;
            })();
        }
        else if (filename === undefined) {
            var __args = arguments;
            if (this.myInput === undefined)
                this.myInput = null;
            if (this.myBitCount === undefined)
                this.myBitCount = 0;
            if (this.myBuffer === undefined)
                this.myBuffer = 0;
            if (this.myInput === undefined)
                this.myInput = null;
            if (this.myBitCount === undefined)
                this.myBitCount = 0;
            if (this.myBuffer === undefined)
                this.myBuffer = 0;
            (function () {
                try {
                    _this.reset();
                }
                catch (e) {
                    throw Object.defineProperty(new Error("could not open file for reading bits " + e), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
                }
                ;
            })();
        }
        else
            throw new Error('invalid overload');
    }


    BitInputStream.bmask_$LI$ = function () { if (BitInputStream.bmask == null)
        BitInputStream.bmask = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535, 131071, 262143, 524287, 1048575, 2097151, 4194303, 8388607, 16777215, 33554431, 67108863, 134217727, 268435455, 536870911, 1073741823, 2147483647, -1]; return BitInputStream.bmask; };
    ;


    /**
     * Return true if the stream has been initialized from a File and
     * is thus reset-able. If constructed from an InputStream it is not reset-able.
     * @return {boolean} true if stream can be reset (it has been constructed appropriately from a File).
     */
    BitInputStream.prototype.markSupported = function () {
        return true;
    };


    /**
     * Reset stream to beginning. The implementation creates a new
     * stream.
     * @throws IOException if not reset-able (e.g., constructed from InputStream).
     */
    BitInputStream.prototype.reset = function () {
        if (!this.markSupported()) {
            throw Object.defineProperty(new Error("not resettable"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.io.IOException', 'java.lang.Object', 'java.lang.Exception'] });
        }
        this.close();
        this.myBuffer = this.myBitCount = 0;
    };


    /**
     * Closes the input stream.
     * @throws RuntimeException if the close fails
     */
    BitInputStream.prototype.close = function () {
        try {
            if (this.myInput != null) {
                /* close */ ;
            }
        }
        catch (ioe) {
            throw Object.defineProperty(new Error("error closing bit stream " + ioe), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
        ;
    };


    /**
     * Returns the number of bits requested as rightmost bits in
     * returned value, returns -1 if not enough bits available to
     * satisfy the request.
     *
     * @param {number} howManyBits is the number of bits to read and return
     * @return {number} the value read, only rightmost <code>howManyBits</code>
     * are valid, returns -1 if not enough bits left
     */
    BitInputStream.prototype.readBits = function (howManyBits) {
        var retval = 0;
        if (this.myInput == null) {
            return -1;
        }
        while ((howManyBits > this.myBitCount)) {
            {
                retval |= (this.myBuffer << (howManyBits - this.myBitCount));
                howManyBits -= this.myBitCount;
                try {
                    if ((this.myBuffer = (function (r) { return r.str.charCodeAt(r.cursor++); })(this.myInput)) === -1) {
                        return -1;
                    }
                }
                catch (ioe) {
                    throw Object.defineProperty(new Error("bitreading trouble " + ioe), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.io.IOException', 'java.lang.Object', 'java.lang.Exception'] });
                }
                ;
                this.myBitCount = BitInputStream.BITS_PER_BYTE;
            }
        }
        ;
        if (howManyBits > 0) {
            retval |= this.myBuffer >> (this.myBitCount - howManyBits);
            this.myBuffer &= BitInputStream.bmask_$LI$()[this.myBitCount - howManyBits];
            this.myBitCount -= howManyBits;
        }
        return retval;
    };


    /**
     * Required by classes extending InputStream, returns
     * the next byte from this stream as an int value.
     * @return {number} the next byte from this stream
     */
    BitInputStream.prototype.read = function () {
        return this.readBits(BitInputStream.BITS_PER_BYTE);
    };


    return BitInputStream;
}());
BitInputStream.BITS_PER_BYTE = 8;
BitInputStream["__class"] = "BitInputStream";
BitInputStream["__interfaces"] = ["java.io.Closeable", "java.lang.AutoCloseable"];










/**
 * Create a stream that writes-through to the <code>OutputStream</code> object
 * passed as a parameter.
 * @param {java.io.OutputStream} out is the output stream to which bits are written
 * @class
 * @extends java.io.OutputStream
 * @author Owen Astrachan
 */
var BitOutputStream = (function () {
    function BitOutputStream(out) {
        var _this = this;
        if (((out != null && out instanceof java.io.OutputStream) || out === null)) {
            var __args = arguments;
            if (this.myOutput === undefined)
                this.myOutput = null;
            if (this.myBuffer === undefined)
                this.myBuffer = 0;
            if (this.myBitsToGo === undefined)
                this.myBitsToGo = 0;
            if (this.myOutput === undefined)
                this.myOutput = null;
            if (this.myBuffer === undefined)
                this.myBuffer = 0;
            if (this.myBitsToGo === undefined)
                this.myBitsToGo = 0;
            (function () {
                _this.myOutput = out;
                _this.initialize();
            })();
        }
        else if (((typeof out === 'string') || out === null)) {
            var __args = arguments;
            var filename = __args[0];
            if (this.myOutput === undefined)
                this.myOutput = null;
            if (this.myBuffer === undefined)
                this.myBuffer = 0;
            if (this.myBitsToGo === undefined)
                this.myBitsToGo = 0;
            if (this.myOutput === undefined)
                this.myOutput = null;
            if (this.myBuffer === undefined)
                this.myBuffer = 0;
            if (this.myBitsToGo === undefined)
                this.myBitsToGo = 0;
            (function () {
                try {
                }
                catch (se) {
                    throw Object.defineProperty(new Error("security exception on write " + se), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
                }
                ;
                _this.initialize();
            })();
        }
        else
            throw new Error('invalid overload');
    }
    BitOutputStream.bmask_$LI$ = function () { if (BitOutputStream.bmask == null)
        BitOutputStream.bmask = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535, 131071, 262143, 524287, 1048575, 2097151, 4194303, 8388607, 16777215, 33554431, 67108863, 134217727, 268435455, 536870911, 1073741823, 2147483647, -1]; return BitOutputStream.bmask; };
    ;
    /**
     * Required by OutputStream subclasses, write the low
     * 8-bits to the underlying outputstream
     * @param {number} b
     */
    BitOutputStream.prototype.write = function (b) {
        this.myOutput.write(b);
    };
    /*private*/ BitOutputStream.prototype.initialize = function () {
        this.myBuffer = 0;
        this.myBitsToGo = BitOutputStream.BITS_PER_BYTE;
    };
    /**
     * Flushes bits not yet written, must be called by client
     * programs if <code>close</code> isn't called.
     * @throws RuntimeException if there's a problem writing bits
     */
    BitOutputStream.prototype.flush = function () {
        if (this.myBitsToGo !== BitOutputStream.BITS_PER_BYTE) {
            try {
                this.write((this.myBuffer << this.myBitsToGo));
            }
            catch (ioe) {
                throw Object.defineProperty(new Error("error writing bits on flush " + ioe), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
            }
            ;
            this.myBuffer = 0;
            this.myBitsToGo = BitOutputStream.BITS_PER_BYTE;
        }
        try {
            this.myOutput.flush();
        }
        catch (ioe) {
            throw Object.defineProperty(new Error("error on flush " + ioe), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
        ;
    };
    /**
     * Releases system resources associated with file and
     * flushes bits not yet written. Either this function
     * or flush must be called or not all bits will be written
     * @throws RuntimeException if close fails
     */
    BitOutputStream.prototype.close = function () {
        this.flush();
        try {
            this.myOutput.close();
        }
        catch (ioe) {
            throw Object.defineProperty(new Error("error closing BitOutputStream " + ioe), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
        ;
    };
    /**
     * Write specified number of bits from value to a file.
     * @param {number} howManyBits is number of bits to write (1-32)
     * @param {number} value is source of bits, rightmost bits are written
     * @throws RuntimeException if there's an I/O problem writing bits
     */
    BitOutputStream.prototype.writeBits = function (howManyBits, value) {
        value &= BitOutputStream.bmask_$LI$()[howManyBits];
        while ((howManyBits >= this.myBitsToGo)) {
            {
                this.myBuffer = (this.myBuffer << this.myBitsToGo) | (value >> (howManyBits - this.myBitsToGo));
                try {
                    this.write(this.myBuffer);
                }
                catch (ioe) {
                    throw Object.defineProperty(new Error("error writing bits " + ioe), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
                }
                ;
                value &= BitOutputStream.bmask_$LI$()[howManyBits - this.myBitsToGo];
                howManyBits -= this.myBitsToGo;
                this.myBitsToGo = BitOutputStream.BITS_PER_BYTE;
                this.myBuffer = 0;
            }
        }
        ;
        if (howManyBits > 0) {
            this.myBuffer = (this.myBuffer << howManyBits) | value;
            this.myBitsToGo -= howManyBits;
        }
    };
    return BitOutputStream;
}());
BitOutputStream.BITS_PER_BYTE = 8;
BitOutputStream["__class"] = "BitOutputStream";
BitOutputStream["__interfaces"] = ["java.io.Closeable", "java.lang.AutoCloseable", "java.io.Flushable"];










var IHuffConstants;
(function (IHuffConstants) {
    /**
     * The standard number of bits per chunk/word when huffing.
     */
    IHuffConstants.BITS_PER_WORD = 8;
    function ALPH_SIZE_$LI$() { if (IHuffConstants.ALPH_SIZE == null)
        IHuffConstants.ALPH_SIZE = (1 << IHuffConstants.BITS_PER_WORD); return IHuffConstants.ALPH_SIZE; }
    IHuffConstants.ALPH_SIZE_$LI$ = ALPH_SIZE_$LI$;
    ;
    /**
     * The standard number of bits needed to represent/store
     * an int, this is 32 in Java and nearly all other languages.
     */
    IHuffConstants.BITS_PER_INT = 32;
    function PSEUDO_EOF_$LI$() { if (IHuffConstants.PSEUDO_EOF == null)
        IHuffConstants.PSEUDO_EOF = IHuffConstants.ALPH_SIZE_$LI$(); return IHuffConstants.PSEUDO_EOF; }
    IHuffConstants.PSEUDO_EOF_$LI$ = PSEUDO_EOF_$LI$;
    ;
    /**
     * Isolate the magic numbers in one place. Files compressed with
     * a HuffProcessor must start with this value.
     */
    IHuffConstants.MAGIC_NUMBER = -87129600;
    function STORE_COUNTS_$LI$() { if (IHuffConstants.STORE_COUNTS == null)
        IHuffConstants.STORE_COUNTS = IHuffConstants.MAGIC_NUMBER | 1; return IHuffConstants.STORE_COUNTS; }
    IHuffConstants.STORE_COUNTS_$LI$ = STORE_COUNTS_$LI$;
    ;
    function STORE_TREE_$LI$() { if (IHuffConstants.STORE_TREE == null)
        IHuffConstants.STORE_TREE = IHuffConstants.MAGIC_NUMBER | 2; return IHuffConstants.STORE_TREE; }
    IHuffConstants.STORE_TREE_$LI$ = STORE_TREE_$LI$;
    ;
    function STORE_CUSTOM_$LI$() { if (IHuffConstants.STORE_CUSTOM == null)
        IHuffConstants.STORE_CUSTOM = IHuffConstants.MAGIC_NUMBER | 4; return IHuffConstants.STORE_CUSTOM; }
    IHuffConstants.STORE_CUSTOM_$LI$ = STORE_CUSTOM_$LI$;
    ;
})(IHuffConstants || (IHuffConstants = {}));











var PriorityQ = (function () {
    function PriorityQ() {
        if (this.q === undefined)
            this.q = null;
        this.q = ([]);
    }
    PriorityQ.prototype.enque = function (data) {
        var it = (function (a) { var i = 0; return { next: function () { return i < a.length ? a[i++] : null; }, hasNext: function () { return i < a.length; } }; })(this.q);
        var index = 0;
        var done = false;
        while ((it.hasNext() && !done)) {
            {
                var temp = it.next();
                if (data.compareTo(temp) < 0) {
                    /* add */ this.q.splice(index, 0, data);
                    done = true;
                }
                index++;
            }
        }
        ;
        if (!done) {
            /* add */ (this.q.push(data) > 0);
        }
    };
    PriorityQ.prototype.deque = function () {
        return this.q.splice(0, 1)[0];
    };
    PriorityQ.prototype.size = function () {
        return this.q.length;
    };
    PriorityQ.prototype.toString = function () {
        return ('[' + this.q.join(', ') + ']');
    };
    return PriorityQ;
}());
PriorityQ["__class"] = "PriorityQ";










/**
 * construct internal node (with children).<br>
 * pre: leftSubtree != null, righSubtree != null<br>
 * The new node's frequency will be the sum of the frequencies of leftSubtree and rightSubtree.
 *
 * @param {number} value the stored as value of node
 * @param {TreeNode} leftSubtree is left subtree
 * @param {TreeNode} rightSubtree is right subtree
 * @class
 * @author Owen Astrachan, minor changes Mike Scott, version >= 3.0
 */
var TreeNode = (function () {
    function TreeNode(leftSubtree, value, rightSubtree) {
        var _this = this;
        if (((leftSubtree != null && leftSubtree instanceof TreeNode) || leftSubtree === null) && ((typeof value === 'number') || value === null) && ((rightSubtree != null && rightSubtree instanceof TreeNode) || rightSubtree === null)) {
            var __args = arguments;
            if (this.value === undefined)
                this.value = 0;
            if (this.frequency === undefined)
                this.frequency = 0;
            if (this.left === undefined)
                this.left = null;
            if (this.right === undefined)
                this.right = null;
            if (this.value === undefined)
                this.value = 0;
            if (this.frequency === undefined)
                this.frequency = 0;
            if (this.left === undefined)
                this.left = null;
            if (this.right === undefined)
                this.right = null;
            (function () {
                if (leftSubtree == null || rightSubtree == null)
                    throw Object.defineProperty(new Error("child node references cannot be null"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
                _this.value = value;
                _this.left = leftSubtree;
                _this.right = rightSubtree;
                _this.frequency = _this.left.frequency + _this.right.frequency;
            })();
        }
        else if (((typeof leftSubtree === 'number') || leftSubtree === null) && ((typeof value === 'number') || value === null) && rightSubtree === undefined) {
            var __args = arguments;
            var value_1 = __args[0];
            var freq_1 = __args[1];
            if (this.value === undefined)
                this.value = 0;
            if (this.frequency === undefined)
                this.frequency = 0;
            if (this.left === undefined)
                this.left = null;
            if (this.right === undefined)
                this.right = null;
            if (this.value === undefined)
                this.value = 0;
            if (this.frequency === undefined)
                this.frequency = 0;
            if (this.left === undefined)
                this.left = null;
            if (this.right === undefined)
                this.right = null;
            (function () {
                _this.value = value_1;
                _this.frequency = freq_1;
            })();
        }
        else
            throw new Error('invalid overload');
    }
    /**
     * Return value  based on comparing this TreeNode to another.
     * @return {number} value < 0 if this < rhs, value > 0 if this > rhs, and 0 if this == rhs
     * @param {TreeNode} rhs
     */
    TreeNode.prototype.compareTo = function (rhs) {
        return this.frequency - rhs.frequency;
    };
    /**
     * Return a String version of this node.
     * @return {string} A String version of this node including the frequency (weight) and value.
     */
    TreeNode.prototype.toString = function () {
        return "(" + this.frequency + ", " + String.fromCharCode(this.value) + " as char, " + this.value + " value as int)";
    };
    /**
     * Get the value stored in this node.
     * @return {number} the value stored in this node
     */
    TreeNode.prototype.getValue = function () {
        return this.value;
    };
    /**
     * Get the frequency of this node.
     * @return {number} the frequency of this node. For internal nods the value should be the sum of the child nodes
     */
    TreeNode.prototype.getFrequency = function () {
        return this.frequency;
    };
    /**
     * Get the left child of this node.
     * @return {TreeNode} The left child of this node. If no left child, returns null.
     */
    TreeNode.prototype.getLeft = function () {
        return this.left;
    };
    /**
     * Get the right child of this node.
     * @return {TreeNode} The right child of this node. If no right child, returns null.
     */
    TreeNode.prototype.getRight = function () {
        return this.right;
    };
    /**
     * Is this node a leaf or not.
     * @return {boolean} true if this node is a leaf, false if it is an internal node
     */
    TreeNode.prototype.isLeaf = function () {
        return this.left == null && this.right == null;
    };
    /**
     * Set the left child of this TreeNode to the given value.
     * @param {TreeNode} newLeft The new left child for this TreeNode.
     */
    TreeNode.prototype.setLeft = function (newLeft) {
        this.left = newLeft;
    };
    /**
     * Set the right child of this TreeNode to the given value.
     * @param {TreeNode} newRight The new right child for this TreeNode.
     */
    TreeNode.prototype.setRight = function (newRight) {
        this.right = newRight;
    };
    return TreeNode;
}());
TreeNode["__class"] = "TreeNode";
TreeNode["__interfaces"] = ["java.lang.Comparable"];










var HuffTree = (function () {
    function HuffTree(queue) {
        var _this = this;
        if (((queue != null && queue instanceof PriorityQ) || queue === null)) {
            var __args = arguments;
            if (this.root === undefined)
                this.root = null;
            if (this.treeSize === undefined)
                this.treeSize = 0;
            if (this.root === undefined)
                this.root = null;
            if (this.treeSize === undefined)
                this.treeSize = 0;
            (function () {
                _this.treeSize = 0;
                _this.root = _this.makeTree(queue);
            })();
        }
        else if (((queue != null && queue instanceof BitInputStream) || queue === null)) {
            var __args = arguments;
            var bitIn_1 = __args[0];
            if (this.root === undefined)
                this.root = null;
            if (this.treeSize === undefined)
                this.treeSize = 0;
            if (this.root === undefined)
                this.root = null;
            if (this.treeSize === undefined)
                this.treeSize = 0;
            (function () {
                _this.treeSize = 0;
                _this.root = _this.deCodeMakeTree(bitIn_1, new TreeNode(-1, 0));
            })();
        }
        else
            throw new Error('invalid overload');
    }
    /*private*/ HuffTree.prototype.makeTree = function (priorityQue) {
        while ((priorityQue.size() >= 2)) {
            {
                var left = priorityQue.deque();
                var right = priorityQue.deque();
                var temp = new TreeNode(left, left.getFrequency() + right.getFrequency(), right);
                priorityQue.enque(temp);
            }
        }
        ;
        return priorityQue.deque();
    };
    HuffTree.prototype.nodesSizeAndWrite = function (bitOut, fromCompress) {
        this.treeSize = 0;
        this.treeHeader(bitOut, this.root, fromCompress);
        return this.treeSize;
    };
    /*private*/ HuffTree.prototype.treeHeader = function (bitOut, temp, fromCompress) {
        if (temp.isLeaf()) {
            if (fromCompress) {
                bitOut.writeBits(1, 1);
                bitOut.writeBits(IHuffConstants.BITS_PER_WORD + 1, temp.getValue());
            }
            else {
                this.treeSize++;
            }
        }
        else {
            if (fromCompress) {
                bitOut.writeBits(1, 0);
            }
            else {
                this.treeSize++;
            }
            this.treeHeader(bitOut, temp.getLeft(), fromCompress);
            this.treeHeader(bitOut, temp.getRight(), fromCompress);
        }
    };
    HuffTree.prototype.makeCode = function () {
        var huffCode = ({});
        this.traverseHelp(this.root, { str: "", toString: function () { return this.str; } }, huffCode);
        return huffCode;
    };
    /*private*/ HuffTree.prototype.traverseHelp = function (temp, sb, newCode) {
        if (temp.isLeaf()) {
            /* put */ (function (m, k, v) { if (m.entries == null)
                m.entries = []; for (var i = 0; i < m.entries.length; i++)
                if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                    m.entries[i].value = v;
                    return;
                } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(newCode, temp.getValue(), /* toString */ sb.str);
        }
        else {
            if (temp.getLeft() != null) {
                /* append */ (function (sb) { sb.str = sb.str.concat(0); return sb; })(sb);
                this.traverseHelp(temp.getLeft(), sb, newCode);
                /* delete */ (function (sb, i1, i2) { sb.str = sb.str.substr(0, i1) + sb.str.substr(i2); return sb; })(sb, /* length */ sb.str.length - 1, /* length */ sb.str.length);
            }
            if (temp.getRight() != null) {
                /* append */ (function (sb) { sb.str = sb.str.concat(1); return sb; })(sb);
                this.traverseHelp(temp.getRight(), sb, newCode);
                /* delete */ (function (sb, i1, i2) { sb.str = sb.str.substr(0, i1) + sb.str.substr(i2); return sb; })(sb, /* length */ sb.str.length - 1, /* length */ sb.str.length);
            }
        }
    };
    /*private*/ HuffTree.prototype.deCodeMakeTree = function (bitIn, temp) {
        var val = bitIn.readBits(1);
        if (val === 1) {
            val = bitIn.readBits(IHuffConstants.BITS_PER_WORD + 1);
            return new TreeNode(val, 0);
        }
        else {
            var temp1 = new TreeNode(-1, 0);
            temp1.setLeft(this.deCodeMakeTree(bitIn, temp1));
            temp1.setRight(this.deCodeMakeTree(bitIn, temp1));
            return temp1;
        }
    };
    HuffTree.prototype.deCodeFile = function (bitIn, bitOut) {
        var done = false;
        var bitVal = 0;
        var temp = this.root;
        this.treeSize = 0;
        while ((!done && (bitVal = bitIn.readBits(1)) !== -1)) {
            {
                temp = this.move(temp, bitVal);
                if (temp.isLeaf()) {
                    var data = temp.getValue();
                    if (data !== IHuffConstants.PSEUDO_EOF_$LI$()) {
                        bitOut.writeBits(IHuffConstants.BITS_PER_WORD, data);
                        this.treeSize += IHuffConstants.BITS_PER_WORD;
                        temp = this.root;
                    }
                    else {
                        done = true;
                    }
                }
            }
        }
        ;
        bitOut.flush();
        bitOut.close();
        /* close */ ;
        return this.treeSize;
    };
    /*private*/ HuffTree.prototype.move = function (temp, bitVal) {
        if (temp.getLeft() != null && bitVal === 0) {
            return temp.getLeft();
        }
        else if (temp.getRight() != null && bitVal === 1) {
            return temp.getRight();
        }
        return temp;
    };
    return HuffTree;
}());
HuffTree["__class"] = "HuffTree";










var HuffCode = (function () {
    function HuffCode(huffManTree) {
        if (this.huffCode === undefined)
            this.huffCode = null;
        this.huffCode = huffManTree.makeCode();
    }
    HuffCode.prototype.getHuffCode = function (key) {
        return (function (m, k) { if (m.entries == null)
            m.entries = []; for (var i = 0; i < m.entries.length; i++)
            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                return m.entries[i].value;
            } return null; })(this.huffCode, key);
    };
    HuffCode.prototype.getSize = function () {
        return (function (m) { if (m.entries == null)
            m.entries = []; return m.entries.length; })(this.huffCode);
    };
    HuffCode.prototype.toString = function () {
        return this.huffCode.toString();
    };
    return HuffCode;
}());
HuffCode["__class"] = "HuffCode";










var MapFrequency = (function () {
    function MapFrequency(bitIn) {
        var _this = this;
        if (((bitIn != null && bitIn instanceof BitInputStream) || bitIn === null)) {
            var __args = arguments;
            if (this.freqs === undefined)
                this.freqs = null;
            if (this.oldSize === undefined)
                this.oldSize = 0;
            if (this.freqs === undefined)
                this.freqs = null;
            if (this.oldSize === undefined)
                this.oldSize = 0;
            (function () {
                _this.freqs = ({});
                _this.oldSize = 0;
                _this.createMap(bitIn);
            })();
        }
        else if (bitIn === undefined) {
            var __args = arguments;
            if (this.freqs === undefined)
                this.freqs = null;
            if (this.oldSize === undefined)
                this.oldSize = 0;
            if (this.freqs === undefined)
                this.freqs = null;
            if (this.oldSize === undefined)
                this.oldSize = 0;
            (function () {
                _this.freqs = ({});
                _this.oldSize = 0;
            })();
        }
        else
            throw new Error('invalid overload');
    }
    /*private*/ MapFrequency.prototype.createMap = function (bitIn) {
        var num;
        while (((num = bitIn.readBits(IHuffConstants.BITS_PER_WORD)) !== -1)) {
            {
                this.oldSize += IHuffConstants.BITS_PER_WORD;
                if ((function (m, k) { if (m.entries == null)
                    m.entries = []; for (var i = 0; i < m.entries.length; i++)
                    if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                        return true;
                    } return false; })(this.freqs, num)) {
                    /* put */ (function (m, k, v) { if (m.entries == null)
                        m.entries = []; for (var i = 0; i < m.entries.length; i++)
                        if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                            m.entries[i].value = v;
                            return;
                        } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(this.freqs, num, /* get */ (function (m, k) { if (m.entries == null)
                        m.entries = []; for (var i = 0; i < m.entries.length; i++)
                        if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                            return m.entries[i].value;
                        } return null; })(this.freqs, num) + 1);
                }
                else {
                    /* put */ (function (m, k, v) { if (m.entries == null)
                        m.entries = []; for (var i = 0; i < m.entries.length; i++)
                        if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                            m.entries[i].value = v;
                            return;
                        } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(this.freqs, num, 1);
                }
            }
        }
        ;
    };
    MapFrequency.prototype.deCompressFillFreqsSTORE_COUNT = function (bitIn) {
        for (var asciiVal = 0; asciiVal < IHuffConstants.ALPH_SIZE_$LI$(); asciiVal++) {
            {
                var val = bitIn.readBits(IHuffConstants.BITS_PER_INT);
                if (val !== 0) {
                    /* put */ (function (m, k, v) { if (m.entries == null)
                        m.entries = []; for (var i = 0; i < m.entries.length; i++)
                        if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                            m.entries[i].value = v;
                            return;
                        } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(this.freqs, asciiVal, val);
                }
            }
            ;
        }
    };
    MapFrequency.prototype.getOriginalSize = function () {
        return this.oldSize;
    };
    MapFrequency.prototype.getFrequency = function (key) {
        return (function (m, k) { if (m.entries == null)
            m.entries = []; for (var i = 0; i < m.entries.length; i++)
            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                return m.entries[i].value;
            } return null; })(this.freqs, key) != null ? (function (m, k) { if (m.entries == null)
            m.entries = []; for (var i = 0; i < m.entries.length; i++)
            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                return m.entries[i].value;
            } return null; })(this.freqs, key) : -1;
    };
    MapFrequency.prototype.keySet = function () {
        return (function (m) { var r = []; if (m.entries == null)
            m.entries = []; for (var i = 0; i < m.entries.length; i++)
            r.push(m.entries[i].key); return r; })(this.freqs);
    };
    return MapFrequency;
}());
MapFrequency["__class"] = "MapFrequency";










var SimpleHuffProcessor = (function () {
    function SimpleHuffProcessor() {
        if (this.myViewer === undefined)
            this.myViewer = null;
        if (this.newSize === undefined)
            this.newSize = 0;
        if (this.storeType === undefined)
            this.storeType = 0;
        if (this.freqs === undefined)
            this.freqs = null;
        if (this.huffManCode === undefined)
            this.huffManCode = null;
        if (this.huffManTree === undefined)
            this.huffManTree = null;
        if (this.treeSize === undefined)
            this.treeSize = 0;
    }
    /**
     * Compresses input to output, where the same InputStream has
     * previously been pre-processed via <code>preprocessCompress</code>
     * storing state used by this call.
     * <br> pre: <code>preprocessCompress</code> must be called before this method
     * @param {{ str: string, cursor: number }} in is the stream being compressed (NOT a BitInputStream)
     * @param {java.io.OutputStream} out is bound to a file/stream to which bits are written
     * for the compressed file (not a BitOutputStream)
     * @param {boolean} force if this is true create the output file even if it is larger than the input file.
     * If this is false do not create the output file if it is larger than the input file.
     * @return {number} the number of bits written.
     * @throws IOException if an error occurs while reading from the input file or
     * writing to the output file.
     */
    SimpleHuffProcessor.prototype.compress = function (__in, out, force) {
        if (!force && this.freqs.getOriginalSize() - this.newSize < 0) {
            this.showString("Compression results in larger file \n Do force compression to compress file");
            return -1;
        }
        else {
            var bitOut = (function () { var __o = new BitOutputStream(out); __o.__delegate = new BitOutputStream(out); return __o; })();
            this.writeHeader(bitOut);
            var bitIn = (function () { var __o = new BitInputStream(__in); __o.__delegate = new BitInputStream(__in); return __o; })();
            this.readAndWriteFileForEncoding(bitOut, bitIn);
            /* close */ ;
            bitOut.close();
            out.close();
            /* close */ ;
            this.showString("Compressed Successfully, new size: " + this.newSize);
            return this.newSize;
        }
    };
    /*private*/ SimpleHuffProcessor.prototype.writeHeader = function (bitOut) {
        bitOut.writeBits(IHuffConstants.BITS_PER_INT, IHuffConstants.MAGIC_NUMBER);
        bitOut.writeBits(IHuffConstants.BITS_PER_INT, this.storeType);
        if (this.storeType === IHuffConstants.STORE_COUNTS_$LI$()) {
            for (var ascciVal = 0; ascciVal < IHuffConstants.ALPH_SIZE_$LI$(); ascciVal++) {
                {
                    var frequency = this.freqs.getFrequency(ascciVal);
                    var freqIfNotPresent = 0;
                    if (frequency !== -1) {
                        bitOut.writeBits(IHuffConstants.BITS_PER_INT, frequency);
                    }
                    else {
                        bitOut.writeBits(IHuffConstants.BITS_PER_INT, freqIfNotPresent);
                    }
                }
                ;
            }
        }
        else if (this.storeType === IHuffConstants.STORE_TREE_$LI$()) {
            bitOut.writeBits(IHuffConstants.BITS_PER_INT, this.treeSize);
            this.huffManTree.nodesSizeAndWrite(bitOut, true);
        }
    };
    /*private*/ SimpleHuffProcessor.prototype.readAndWriteFileForEncoding = function (bitOut, bitIn) {
        var num;
        while (((num = bitIn.readBits(IHuffConstants.BITS_PER_WORD)) !== -1)) {
            {
                var newLetterCode = this.huffManCode.getHuffCode(num);
                for (var bits = 0; bits < newLetterCode.length; bits++) {
                    {
                        bitOut.writeBits(1, (newLetterCode.charAt(bits)).charCodeAt(0));
                    }
                    ;
                }
            }
        }
        ;
        var newPEOFCode = this.huffManCode.getHuffCode(IHuffConstants.PSEUDO_EOF_$LI$());
        for (var bits = 0; bits < newPEOFCode.length; bits++) {
            {
                bitOut.writeBits(1, (newPEOFCode.charAt(bits)).charCodeAt(0));
            }
            ;
        }
        bitOut.flush();
        bitOut.close();
        /* close */ ;
    };
    /**
     * Preprocess data so that compression is possible ---
     * count characters/create tree/store state so that
     * a subsequent call to compress will work. The InputStream
     * is <em>not</em> a BitInputStream, so wrap it int one as needed.
     * @param {{ str: string, cursor: number }} in is the stream which could be subsequently compressed
     * @param {number} headerFormat a constant from IHuffProcessor that determines what kind of
     * header to use, standard count format, standard tree format, or
     * possibly some format added in the future.
     * @return {number} number of bits saved by compression or some other measure
     * Note, to determine the number of
     * bits saved, the number of bits written includes
     * ALL bits that will be written including the
     * magic number, the header format number, the header to
     * reproduce the tree, AND the actual data.
     * @throws IOException if an error occurs while reading from the input file.
     */
    SimpleHuffProcessor.prototype.preprocessCompress = function (__in, headerFormat) {
        this.newSize = 0;
        this.storeType = headerFormat;
        var bitIn = (function () { var __o = new BitInputStream(__in); __o.__delegate = new BitInputStream(__in); return __o; })();
        this.freqs = new MapFrequency(bitIn);
        /* close */ ;
        var queue = this.generateQ();
        this.huffManTree = new HuffTree(queue);
        this.huffManCode = new HuffCode(this.huffManTree);
        this.headerSize();
        {
            var array3809 = this.freqs.keySet();
            for (var index3808 = 0; index3808 < array3809.length; index3808++) {
                var element = array3809[index3808];
                {
                    this.newSize += this.huffManCode.getHuffCode(element).length * this.freqs.getFrequency(element);
                }
            }
        }
        this.newSize += this.huffManCode.getHuffCode(IHuffConstants.PSEUDO_EOF_$LI$()).length;
        /* close */ ;
        /* close */ ;
        this.showString("done precompressing, diff in size:" + (this.freqs.getOriginalSize() - this.newSize));
        return this.freqs.getOriginalSize() - this.newSize;
    };
    /*private*/ SimpleHuffProcessor.prototype.generateQ = function () {
        var queue = (new PriorityQ());
        {
            var array3811 = this.freqs.keySet();
            for (var index3810 = 0; index3810 < array3811.length; index3810++) {
                var key = array3811[index3810];
                {
                    var node_1 = new TreeNode(key, this.freqs.getFrequency(key));
                    queue.enque(node_1);
                }
            }
        }
        var node = new TreeNode(IHuffConstants.PSEUDO_EOF_$LI$(), this.freqs.getFrequency(IHuffConstants.PSEUDO_EOF_$LI$()));
        queue.enque(node);
        return queue;
    };
    /*private*/ SimpleHuffProcessor.prototype.headerSize = function () {
        if (this.storeType === IHuffConstants.STORE_COUNTS_$LI$()) {
            this.newSize = (2 * IHuffConstants.BITS_PER_INT) + (IHuffConstants.ALPH_SIZE_$LI$() * IHuffConstants.BITS_PER_INT);
        }
        else if (this.storeType === IHuffConstants.STORE_TREE_$LI$()) {
            this.newSize = this.huffManTree.nodesSizeAndWrite(null, false);
            this.newSize += this.huffManCode.getSize() * (IHuffConstants.BITS_PER_WORD + 1);
            this.treeSize = this.newSize;
            this.newSize += 3 * IHuffConstants.BITS_PER_INT;
        }
        else {
            this.showString("Unrecognised headerFormat by this program");
        }
    };
    /**
     * Make sure this model communicates with some view.
     * @param {*} viewer is the view for communicating.
     */
    SimpleHuffProcessor.prototype.setViewer = function (viewer) {
        this.myViewer = viewer;
    };
    /**
     * Uncompress a previously compressed stream in, writing the
     * uncompressed bits/data to out.
     * @param {{ str: string, cursor: number }} in is the previously compressed data (not a BitInputStream)
     * @param {java.io.OutputStream} out is the uncompressed file/stream
     * @return {number} the number of bits written to the uncompressed file/stream
     * @throws IOException if an error occurs while reading from the input file or
     * writing to the output file.
     */
    SimpleHuffProcessor.prototype.uncompress = function (__in, out) {
        var bitIn = (function () { var __o = new BitInputStream(__in); __o.__delegate = new BitInputStream(__in); return __o; })();
        this.newSize = 0;
        if (bitIn.readBits(IHuffConstants.BITS_PER_INT) !== IHuffConstants.MAGIC_NUMBER) {
            /* close */ ;
            /* close */ ;
            this.showString("File not readable: dosent have MAGIC_NUMBER");
            return -1;
        }
        else {
            var bitOut = (function () { var __o = new BitOutputStream(out); __o.__delegate = new BitOutputStream(out); return __o; })();
            this.storeType = bitIn.readBits(IHuffConstants.BITS_PER_INT);
            this.dealStoreType(bitIn, this.storeType);
            this.newSize = this.huffManTree.deCodeFile(bitIn, bitOut);
            bitOut.close();
            /* close */ ;
            out.close();
            /* close */ ;
            this.showString("unCompressed Successfuly, new Size:" + this.newSize);
            return this.newSize;
        }
    };
    /*private*/ SimpleHuffProcessor.prototype.dealStoreType = function (bitIn, storeType) {
        if (storeType === IHuffConstants.STORE_COUNTS_$LI$()) {
            this.freqs = new MapFrequency();
            this.freqs.deCompressFillFreqsSTORE_COUNT(bitIn);
            var queue = this.generateQ();
            this.huffManTree = new HuffTree(queue);
        }
        else if (storeType === IHuffConstants.STORE_TREE_$LI$()) {
            this.treeSize = bitIn.readBits(IHuffConstants.BITS_PER_INT);
            this.huffManTree = new HuffTree(bitIn);
        }
        else {
            this.showString("Unrecognised headerFormat by this program");
            throw Object.defineProperty(new Error("Unrecognised headerFormat by this program"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.io.IOException', 'java.lang.Object', 'java.lang.Exception'] });
        }
    };
    /*private*/ SimpleHuffProcessor.prototype.showString = function (s) {
        if (this.myViewer != null)
            this.myViewer.update(s);
    };
    return SimpleHuffProcessor;
}());
SimpleHuffProcessor["__class"] = "SimpleHuffProcessor";
SimpleHuffProcessor["__interfaces"] = ["IHuffProcessor", "IHuffConstants"];










/**
 * Main/launch program for Huff assignment. A better
 * comment than this is warranted.
 * @class
 */
var Huff = (function () {
    function Huff() {
    }
    Huff.main = function (args) {
        var proc = new SimpleHuffProcessor();
    };
    return Huff;
}());
Huff["__class"] = "Huff";
BitOutputStream.bmask_$LI$();
BitInputStream.bmask_$LI$();
Huff.main(null);
