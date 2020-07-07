# This file is generated by gyp; do not edit.

TOOLSET := target
TARGET := sqlite3
DEFS_Debug := \
	'-DNODE_GYP_MODULE_NAME=sqlite3' \
	'-DUSING_UV_SHARED=1' \
	'-DUSING_V8_SHARED=1' \
	'-DV8_DEPRECATION_WARNINGS=1' \
	'-D_DARWIN_USE_64_BIT_INODE=1' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-DSQLITE_THREADSAFE=0' \
	'-DSQLITE_DEFAULT_MEMSTATUS=0' \
	'-DSQLITE_OMIT_DEPRECATED' \
	'-DSQLITE_OMIT_GET_TABLE' \
	'-DSQLITE_OMIT_TCL_VARIABLE' \
	'-DSQLITE_OMIT_PROGRESS_CALLBACK' \
	'-DSQLITE_TRACE_SIZE_LIMIT=32' \
	'-DSQLITE_DEFAULT_CACHE_SIZE=-16000' \
	'-DSQLITE_DEFAULT_FOREIGN_KEYS=1' \
	'-DSQLITE_DEFAULT_WAL_SYNCHRONOUS=1' \
	'-DSQLITE_USE_URI=1' \
	'-DSQLITE_ENABLE_COLUMN_METADATA' \
	'-DSQLITE_ENABLE_UPDATE_DELETE_LIMIT' \
	'-DSQLITE_ENABLE_STAT4' \
	'-DSQLITE_ENABLE_FTS3_PARENTHESIS' \
	'-DSQLITE_ENABLE_FTS3' \
	'-DSQLITE_ENABLE_FTS4' \
	'-DSQLITE_ENABLE_FTS5' \
	'-DSQLITE_ENABLE_JSON1' \
	'-DSQLITE_ENABLE_RTREE' \
	'-DSQLITE_INTROSPECTION_PRAGMAS' \
	'-DSQLITE_SOUNDEX' \
	'-DDEBUG' \
	'-D_DEBUG' \
	'-DV8_ENABLE_CHECKS' \
	'-DSQLITE_DEBUG' \
	'-DSQLITE_MEMDEBUG' \
	'-DSQLITE_ENABLE_API_ARMOR' \
	'-DSQLITE_WIN32_MALLOC_VALIDATE'

# Flags passed to all source files.
CFLAGS_Debug := \
	-O0 \
	-gdwarf-2 \
	-mmacosx-version-min=10.7 \
	-arch x86_64 \
	-Wall \
	-Wendif-labels \
	-W \
	-Wno-unused-parameter \
	-Wno-unused-function \
	-Wno-sign-compare

# Flags passed to only C files.
CFLAGS_C_Debug := \
	-fno-strict-aliasing \
	-std=c99

# Flags passed to only C++ files.
CFLAGS_CC_Debug := \
	-std=gnu++1y \
	-stdlib=libc++ \
	-fno-rtti \
	-fno-exceptions \
	-fno-strict-aliasing \
	-std=c99

# Flags passed to only ObjC files.
CFLAGS_OBJC_Debug :=

# Flags passed to only ObjC++ files.
CFLAGS_OBJCC_Debug :=

INCS_Debug := \
	-I/Users/apple/.node-gyp/10.12.0/include/node \
	-I/Users/apple/.node-gyp/10.12.0/src \
	-I/Users/apple/.node-gyp/10.12.0/deps/openssl/config \
	-I/Users/apple/.node-gyp/10.12.0/deps/openssl/openssl/include \
	-I/Users/apple/.node-gyp/10.12.0/deps/uv/include \
	-I/Users/apple/.node-gyp/10.12.0/deps/zlib \
	-I/Users/apple/.node-gyp/10.12.0/deps/v8/include \
	-I$(obj)/gen/sqlite3

DEFS_Release := \
	'-DNODE_GYP_MODULE_NAME=sqlite3' \
	'-DUSING_UV_SHARED=1' \
	'-DUSING_V8_SHARED=1' \
	'-DV8_DEPRECATION_WARNINGS=1' \
	'-D_DARWIN_USE_64_BIT_INODE=1' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-DSQLITE_THREADSAFE=0' \
	'-DSQLITE_DEFAULT_MEMSTATUS=0' \
	'-DSQLITE_OMIT_DEPRECATED' \
	'-DSQLITE_OMIT_GET_TABLE' \
	'-DSQLITE_OMIT_TCL_VARIABLE' \
	'-DSQLITE_OMIT_PROGRESS_CALLBACK' \
	'-DSQLITE_TRACE_SIZE_LIMIT=32' \
	'-DSQLITE_DEFAULT_CACHE_SIZE=-16000' \
	'-DSQLITE_DEFAULT_FOREIGN_KEYS=1' \
	'-DSQLITE_DEFAULT_WAL_SYNCHRONOUS=1' \
	'-DSQLITE_USE_URI=1' \
	'-DSQLITE_ENABLE_COLUMN_METADATA' \
	'-DSQLITE_ENABLE_UPDATE_DELETE_LIMIT' \
	'-DSQLITE_ENABLE_STAT4' \
	'-DSQLITE_ENABLE_FTS3_PARENTHESIS' \
	'-DSQLITE_ENABLE_FTS3' \
	'-DSQLITE_ENABLE_FTS4' \
	'-DSQLITE_ENABLE_FTS5' \
	'-DSQLITE_ENABLE_JSON1' \
	'-DSQLITE_ENABLE_RTREE' \
	'-DSQLITE_INTROSPECTION_PRAGMAS' \
	'-DSQLITE_SOUNDEX' \
	'-DNDEBUG'

# Flags passed to all source files.
CFLAGS_Release := \
	-O3 \
	-mmacosx-version-min=10.7 \
	-arch x86_64 \
	-Wall \
	-Wendif-labels \
	-W \
	-Wno-unused-parameter \
	-Wno-unused-function \
	-Wno-sign-compare

# Flags passed to only C files.
CFLAGS_C_Release := \
	-fno-strict-aliasing \
	-std=c99

# Flags passed to only C++ files.
CFLAGS_CC_Release := \
	-std=gnu++1y \
	-stdlib=libc++ \
	-fno-rtti \
	-fno-exceptions \
	-fvisibility-inlines-hidden \
	-fno-strict-aliasing \
	-std=c99

# Flags passed to only ObjC files.
CFLAGS_OBJC_Release :=

# Flags passed to only ObjC++ files.
CFLAGS_OBJCC_Release :=

INCS_Release := \
	-I/Users/apple/.node-gyp/10.12.0/include/node \
	-I/Users/apple/.node-gyp/10.12.0/src \
	-I/Users/apple/.node-gyp/10.12.0/deps/openssl/config \
	-I/Users/apple/.node-gyp/10.12.0/deps/openssl/openssl/include \
	-I/Users/apple/.node-gyp/10.12.0/deps/uv/include \
	-I/Users/apple/.node-gyp/10.12.0/deps/zlib \
	-I/Users/apple/.node-gyp/10.12.0/deps/v8/include \
	-I$(obj)/gen/sqlite3

OBJS := \
	$(obj).target/$(TARGET)/gen/sqlite3/sqlite3.o

# Add to the list of files we specially track dependencies for.
all_deps += $(OBJS)

# Make sure our dependencies are built before any of us.
$(OBJS): | $(obj).target/deps/locate_sqlite3.stamp

# CFLAGS et al overrides must be target-local.
# See "Target-specific Variable Values" in the GNU Make manual.
$(OBJS): TOOLSET := $(TOOLSET)
$(OBJS): GYP_CFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_C_$(BUILDTYPE))
$(OBJS): GYP_CXXFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_CC_$(BUILDTYPE))
$(OBJS): GYP_OBJCFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_C_$(BUILDTYPE)) $(CFLAGS_OBJC_$(BUILDTYPE))
$(OBJS): GYP_OBJCXXFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_CC_$(BUILDTYPE)) $(CFLAGS_OBJCC_$(BUILDTYPE))

# Suffix rules, putting all outputs into $(obj).

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(srcdir)/%.c FORCE_DO_CMD
	@$(call do_cmd,cc,1)

# Try building from generated source, too.

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj).$(TOOLSET)/%.c FORCE_DO_CMD
	@$(call do_cmd,cc,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj)/%.c FORCE_DO_CMD
	@$(call do_cmd,cc,1)

# End of this set of suffix rules
### Rules for final target.
LDFLAGS_Debug := \
	-mmacosx-version-min=10.7 \
	-arch x86_64 \
	-L$(builddir) \
	-stdlib=libc++

LIBTOOLFLAGS_Debug :=

LDFLAGS_Release := \
	-Wl,-dead_strip \
	-mmacosx-version-min=10.7 \
	-arch x86_64 \
	-L$(builddir) \
	-stdlib=libc++

LIBTOOLFLAGS_Release :=

LIBS :=

$(builddir)/sqlite3.a: GYP_LDFLAGS := $(LDFLAGS_$(BUILDTYPE))
$(builddir)/sqlite3.a: LIBS := $(LIBS)
$(builddir)/sqlite3.a: GYP_LIBTOOLFLAGS := $(LIBTOOLFLAGS_$(BUILDTYPE))
$(builddir)/sqlite3.a: TOOLSET := $(TOOLSET)
$(builddir)/sqlite3.a: $(OBJS) FORCE_DO_CMD
	$(call do_cmd,alink)

all_deps += $(builddir)/sqlite3.a
# Add target alias
.PHONY: sqlite3
sqlite3: $(builddir)/sqlite3.a

# Add target alias to "all" target.
.PHONY: all
all: sqlite3

# Add target alias
.PHONY: sqlite3
sqlite3: $(builddir)/sqlite3.a

# Short alias for building this static library.
.PHONY: sqlite3.a
sqlite3.a: $(builddir)/sqlite3.a

# Add static library to "all" target.
.PHONY: all
all: $(builddir)/sqlite3.a

