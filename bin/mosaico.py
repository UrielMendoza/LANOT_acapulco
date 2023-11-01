import os
from pathlib import Path
from glob import glob

def createMosaic(pathInput,nombre,pathOutput):
    
    files = glob(pathInput+'*')

    mosaicos = ''

    for file in Path(files).rglob('*.TIF'):
        print(file, type(file))
        mosaicos += str(file) + ' '    

    nomMosaicTif = pathOutput+nombre+'.tif'

    # Mosaico con fecha
    os.system('gdal_merge.py -n nan -o '+pathOutput+nombre+'_tmp.tif '+mosaicos)
    # Optimiza el geotiff
    os.system('gdal_translate -CO "TILED=YES" -CO "BLOCKXSIZE=512" -CO "BLOCKYSIZE=512" -CO "BIGTIFF=YES" '+pathOutput+nombre+'_tmp.tif '+nomMosaicTif)
    os.system('gdaladdo -r average '+nomMosaicTif+' 2 4 8 16 32')

pathInput = '/datawork/otis_acapulco/input/geoeye/20231026/'
pathOutput = '/datawork/otis_acapulco/output/mosaicos/'

createMosaic(pathInput,'geoeye_20231026',pathOutput)
